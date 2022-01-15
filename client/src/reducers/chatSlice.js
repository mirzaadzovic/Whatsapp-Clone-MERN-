import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    openedChat: null,
    chats: [],
    messages: [],
  },
  reducers: {
    setChats: (state, action) => ({ ...state, chats: action.payload }),
    newChat: (state, action) => ({
      ...state,
      chats: [action.payload, ...state.chats],
    }),
    newMessage: (state, action) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),
    setMessages: (state, action) => ({ ...state, messages: action.payload }),
    setOpenedChat: (state, action) => ({
      ...state,
      openedChat: action.payload,
    }),
  },
});

export const { newChat, newMessage, setChats, setMessages, setOpenedChat } =
  chatSlice.actions;

export const selectChats = (state) => state.chat.chats;
export const selectMessages = (state) => state.chat.messages;
export const selectOpenedChat = (state) => state.chat.openedChat;

export default chatSlice.reducer;

// function getData(route) {
//   return axios
//     .get(route)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => console.error(err));
// }
