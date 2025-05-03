import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the JWT token in every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt"); // Fetch token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add Authorization header
  }
  return config;
});

// response handler
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
