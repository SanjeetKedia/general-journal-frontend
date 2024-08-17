import axios from "axios";

const apiURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: apiURL,
});

export default apiClient;
