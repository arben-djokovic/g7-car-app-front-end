import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'https://bumpcarnodejs-1.onrender.com/', // http://localhost:3000/ https://bumpcarnodejs-1.railway.app/
    headers: { "Content-Type": "application/json" },
    timeout: 5000
});


api.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
            toast.warning("🚨If the content is not loading, the API server might be waking up. Please wait a moment and try again. 🚀", { toastId: "waking up" })
        } else if (!error.response) {
            toast.warning("The server is currently unavailable. Please wait a moment and try again.");
        } else if (error.response.status === 503) {
            toast.warning("The server is waking up. Please retry in a few seconds.");
        } else {
            toast.warning(`An error occurred: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default api;