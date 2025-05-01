import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional response handler
function handle<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  return promise.then(res => res.data).catch(err => {
    throw new Error(err?.response?.data?.message || err.message);
  });
}

export const api = {
  get: <T>(path: string, config?: AxiosRequestConfig) =>
    handle<T>(instance.get(path, config)),

  post: <T>(path: string, data?: unknown, config?: AxiosRequestConfig) =>
    handle<T>(instance.post(path, data, config)),

  put: <T>(path: string, data?: unknown, config?: AxiosRequestConfig) =>
    handle<T>(instance.put(path, data, config)),

  delete: <T>(path: string, config?: AxiosRequestConfig) =>
    handle<T>(instance.delete(path, config)),
};
