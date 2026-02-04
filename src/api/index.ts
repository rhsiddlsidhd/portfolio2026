// src/api/index.ts

import axios, { AxiosError, type AxiosResponse } from "axios";
import { handleApiError } from "./errorHandler.ts";
import type { ApiError } from "@/types/api.js"; // ApiResponse 대신 ApiError import

const axiosInstance = axios.create({
  baseURL: "/", // Since we are fetching local JSON files
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<ApiError> => {
    const apiError: ApiError = handleApiError(error);
    return Promise.reject(apiError);
  },
);

export default axiosInstance;
