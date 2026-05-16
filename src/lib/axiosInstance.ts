import axios from "axios";


// To fix in the future
const apiURL = "http://192.168.31.240:3000" /*|| "http://localhost:3000"*/;

const apiClient = axios.create({
  baseURL: apiURL,
});

export default apiClient;