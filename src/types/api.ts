export interface ApiResponseSuccess<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    [key: string]: unknown;
  };
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponseError {
  error: ApiErrorDetail;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;
