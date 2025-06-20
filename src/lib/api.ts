import axios from "axios";

const api = axios.create({
    baseURL: process.env.API_BASE_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
