import { PrismaClient } from '@prisma/client';
import net from 'net';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mysql://root:@127.0.0.1:3306/jawa_epic';
}

function parseDbHostPort(urlStr?: string): { host: string; port: number } {
  if (!urlStr) return { host: '127.0.0.1', port: 3306 };
  try {
    const parsed = new URL(urlStr);
    return {
      host: parsed.hostname || '127.0.0.1',
      port: parsed.port ? parseInt(parsed.port, 10) : 3306,
    };
  } catch {
    return { host: '127.0.0.1', port: 3306 };
  }
}

const { host: dbHost, port: dbPort } = parseDbHostPort(process.env.DATABASE_URL);

let isDbReachable: boolean | null = null;
let lastCheckTime = 0;
let hasLoggedOffline = false;
const CHECK_INTERVAL_MS = 15000; // Fast non-blocking recheck every 15s

export async function isDatabaseOnline(timeoutMs = 150): Promise<boolean> {
  const now = Date.now();
  if (isDbReachable !== null && now - lastCheckTime < CHECK_INTERVAL_MS) {
    return isDbReachable;
  }

  return new Promise((resolve) => {
    const socket = new net.Socket();
    let resolved = false;

    const cleanup = () => {
      socket.removeAllListeners();
      socket.destroy();
    };

    socket.setTimeout(timeoutMs);

    socket.once('connect', () => {
      if (!resolved) {
        resolved = true;
        if (isDbReachable === false) {
          console.log('[Database] MySQL connection restored at %s:%d. Live queries active.', dbHost, dbPort);
        }
        isDbReachable = true;
        hasLoggedOffline = false;
        lastCheckTime = Date.now();
        cleanup();
        resolve(true);
      }
    });

    socket.once('timeout', () => {
      if (!resolved) {
        resolved = true;
        isDbReachable = false;
        lastCheckTime = Date.now();
        if (!hasLoggedOffline) {
          console.warn(
            '[Database] MySQL offline at %s:%d. Fast zero-latency seed fallback mode enabled.',
            dbHost,
            dbPort
          );
          hasLoggedOffline = true;
        }
        cleanup();
        resolve(false);
      }
    });

    socket.once('error', () => {
      if (!resolved) {
        resolved = true;
        isDbReachable = false;
        lastCheckTime = Date.now();
        if (!hasLoggedOffline) {
          console.warn(
            '[Database] MySQL offline at %s:%d. Fast zero-latency seed fallback mode enabled.',
            dbHost,
            dbPort
          );
          hasLoggedOffline = true;
        }
        cleanup();
        resolve(false);
      }
    });

    socket.connect(dbPort, dbHost);
  });
}

const globalForPrisma = globalThis as unknown as {
  rawPrisma: PrismaClient | undefined;
  prismaProxy: PrismaClient | undefined;
};

// Use log: [] to prevent Prisma internal Rust engine from writing duplicate stack traces to stderr
const rawPrisma =
  globalForPrisma.rawPrisma ??
  new PrismaClient({
    log: [],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.rawPrisma = rawPrisma;
}

// Transparent Proxy that guards Prisma queries with instant circuit-breaker rejection
// when MySQL is offline, eliminating 2.1s connection timeouts and console spam.
export const prisma =
  globalForPrisma.prismaProxy ??
  new Proxy(rawPrisma, {
    get(target, prop, receiver) {
      const orig = Reflect.get(target, prop, receiver);

      // Handle top-level methods like $connect, $queryRaw, etc.
      if (typeof orig === 'function') {
        return async function (...args: any[]) {
          const online = await isDatabaseOnline();
          if (!online) {
            const err = new Error(`Can't reach database server at \`${dbHost}:${dbPort}\``);
            (err as any).name = 'PrismaClientInitializationError';
            throw err;
          }
          return orig.apply(target, args);
        };
      }

      // Handle model delegates like prisma.character, prisma.philosophy, etc.
      if (typeof prop === 'string' && !prop.startsWith('$') && orig && typeof orig === 'object') {
        return new Proxy(orig, {
          get(modelTarget, modelProp, modelReceiver) {
            const modelMethod = Reflect.get(modelTarget, modelProp, modelReceiver);
            if (typeof modelMethod === 'function') {
              return async function (...args: any[]) {
                const online = await isDatabaseOnline();
                if (!online) {
                  const err = new Error(`Can't reach database server at \`${dbHost}:${dbPort}\``);
                  (err as any).name = 'PrismaClientInitializationError';
                  throw err;
                }
                try {
                  return await modelMethod.apply(modelTarget, args);
                } catch (queryErr: any) {
                  if (
                    queryErr?.name === 'PrismaClientInitializationError' ||
                    String(queryErr?.message).includes("Can't reach database server")
                  ) {
                    isDbReachable = false;
                    lastCheckTime = Date.now();
                  }
                  throw queryErr;
                }
              };
            }
            return modelMethod;
          },
        });
      }

      return orig;
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaProxy = prisma;
}

export default prisma;
