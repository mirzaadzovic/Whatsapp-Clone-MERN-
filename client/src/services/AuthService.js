import axios from "../axios";
class AuthService {
  static getUser = async () => {
    const response = await axios
      .get("/auth/user", { withCredentials: true })
      .catch((err) => null);
    if (response?.status === 200) {
      const user = response.data;
      return user;
    }
    return null;
  };

  static login = async (username, password) => {
    const response = await axios
      .post("/auth/login", { username: username, password: password })
      .catch((err) => null);

    if (response?.status === 201) {
      const user = response.data;
      return user;
    }
    return null;
  };
}

export default AuthService;
