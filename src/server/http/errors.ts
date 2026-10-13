export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Permintaanmu kurang pas. Coba cek format datanya ya.', details?: unknown) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Kamu perlu login dulu untuk mengakses halaman ini.') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Akses ditolak. Kamu tidak punya izin untuk melakukan aksi ini.') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Data yang kamu cari tidak ditemukan atau sudah tidak tersedia.') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Data sudah ada atau terjadi bentrokan status.', details?: unknown) {
    super(message, 409, 'CONFLICT', details);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Data yang kamu kirimkan belum lengkap atau tidak valid.', details?: unknown) {
    super(message, 422, 'UNPROCESSABLE_ENTITY', details);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Terlalu banyak permintaan dalam waktu singkat. Tarik napas dulu dan coba lagi beberapa saat ya.') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}
