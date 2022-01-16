import { unstable_composeClasses } from "@mui/material";
import axios from "../axios";
import UnauthorizedRedirect from "./UnautorizedRedirect";

export default class APIService {
  static getById = async (route, id) => {
    const response = await axios
      .get(`${route}/${id}`, {
        withCredentials: true,
      })
      .catch((err) => null);

    if (response?.status === 200) {
      const messages = response.data;
      return messages;
    }
    return null;
  };

  static getFromRoute = async (route) => {
    const response = await axios
      .get(route, { withCredentials: true })
      .catch((err) => null);

    if (response?.status === 200) {
      const chats = response.data;
      return chats;
    }
    return null;
  };

  static post = async (route, body) => {
    const response = await axios
      .post(route, body, { withCredentials: true })
      .catch((err) => null);

    if (response?.status === 201) {
      const data = response.data;
      return data;
    }
  };

  static put = async (route, data) => {
    const response = await axios
      .put(`${route}/${data.id}`, data, { withCredentials: true, data: data })
      .catch((err) => null);

    if (response?.status === 200) {
      const chat = response.data;
      return chat;
    }
    return null;
  };
}
