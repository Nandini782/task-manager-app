import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-app-bbzo.onrender.com/api",
  withCredentials: true
});

export default API;