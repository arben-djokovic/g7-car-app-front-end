import api from '../api/apiCalls'
import { jwtDecode } from "jwt-decode";

class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("accessToken");
    if (!!token) this.setJWT(token);
    return !!token;
  };

  setJWT = (token) =>
    (api.defaults.headers.common["Authorization"] = `Bearer ${token}`);

  login = (access, username) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("username", username);
    this.setJWT(access);
  };

  getToken = () => localStorage.getItem("accessToken");

  isAuthenticated = () => {
    return !!this.getDecodedToken();
  };
  isAdmin = () => this.getDecodedToken()?.role === "admin";

  getDecodedToken = () => {
    let token = this.getToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  logout = () => localStorage.clear();
}
export const auth = new AuthService();