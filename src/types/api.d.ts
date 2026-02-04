// src/types/api.d.ts

export type ApiError = {
  code: number;
  message: string;
  details?: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
};
