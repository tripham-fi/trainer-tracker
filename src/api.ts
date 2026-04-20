import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";
import { type Customer } from "./types";

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi";

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config).then(responseBody),

  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, body, config).then(responseBody),

  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, body, config).then(responseBody),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config).then(responseBody),
};

const customer = {
    getAll: () => request.get<Customer>("/customers")
}

const consumer = {
    customer
};

export default consumer;