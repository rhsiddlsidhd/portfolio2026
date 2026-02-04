// src/api/errorHandler.ts
import { AxiosError } from "axios";
// ApiResponse import 제거
import { ERROR_MESSAGES } from "@/constants/errorMessages.ts";
import type { ApiError } from "@/types/api";

const getErrorMessageByStatus = (status: number): string => {
  if (status === 401) return ERROR_MESSAGES.UNAUTHORIZED;
  if (status === 404) return ERROR_MESSAGES.NOT_FOUND;
  if (status >= 500) return ERROR_MESSAGES.SERVER_ERROR;
  return ERROR_MESSAGES.NETWORK_ERROR; // Default error
};

// 반환 타입을 ApiError로 변경하고, ApiResponse 래핑 로직 제거
export const handleApiError = (error: AxiosError): ApiError => {
  const status = error.response?.status || 0;
  const message = getErrorMessageByStatus(status);
  const details = error.response?.data
    ? JSON.stringify(error.response.data)
    : error.message;

  const apiError: ApiError = {
    code: status,
    message: message,
    details: details,
  };

  return apiError; // ApiError 객체를 직접 반환
};
