import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API || "https://frontend-test-assignment-api.abz.agency/api/v1",
});

instance.interceptors.request.use((config) => {
  config.headers.Token = window.localStorage.getItem("token");
  return config;
});

export default instance;