
import api from '../api/apiCalls'

class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("accessToken");
    if (!!token) this.setJWT(token);
    return !!token;
  };

  setJWT = (token) =>
    (api.defaults.headers.common["Authorization"] = `Bearer ${token}`);

  login = (access, refresh, username /*, admin */) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("username", username);
    this.setJWT(access);
  };

  logout = () => localStorage.clear();
}
export const auth = new AuthService();