import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bumpcarnodejs.onrender.com/',
    headers: { "Content-Type": "application/json" },
});


api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            alert("The server is currently unavailable. Please wait a moment and try again.");
        } else if (error.response.status === 503) {
            alert("The server is waking up. Please retry in a few seconds.");
        } else {
            alert(`An error occurred: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default api;
