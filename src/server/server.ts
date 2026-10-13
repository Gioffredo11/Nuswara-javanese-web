import { app } from './app';

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  NUSWARA : Express Backend Running!     `);
  console.log(`  Port       : ${PORT}                  `);
  console.log(`  Health URL : http://localhost:${PORT}/health`);
  console.log(`  API Base   : http://localhost:${PORT}/api   `);
  console.log(`=========================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
