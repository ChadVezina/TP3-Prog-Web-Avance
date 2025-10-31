import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Simple response interceptor to normalize errors in one place.
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can extend this to handle auth, logging, retries, etc.
    // Normalize Axios error so callers can expect `error.message` and `error.response?.data`.
    const normalized = new Error(error.message || "Network error");
    normalized.response = error.response;
    return Promise.reject(normalized);
  }
);

export default http;
