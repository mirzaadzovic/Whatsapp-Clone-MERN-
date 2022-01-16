import axios from "../axios";

export default class APIService {
  static getMessages = async (selectedChat) => {
    const response = await axios
      .get(`/api/messages/${selectedChat.id}`, {
        withCredentials: true,
      })
      .catch((err) => null);

    console.log(response);

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

    console.log(response);
    if (response?.status === 200) {
      const chats = response.data;
      return chats;
    }
    return null;
  };
}
