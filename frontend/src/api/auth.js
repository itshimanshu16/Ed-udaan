import axios from "axios";

const API = axios.create({
  baseURL: "https://ed-udaan-1.onrender.com/api", // Your backend base URL
});

// Register API
export const registerUser = (formData) => API.post("/auth/register", formData);

// Login API
export const loginUser = (formData) => API.post("/auth/login", formData);
