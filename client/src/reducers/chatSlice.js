import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
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
  },
});

export const { newChat, newMessage, setChats } = chatSlice.actions;

export const selectChats = (state) => state.chat.chats;
export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;

// function getData(route) {
//   return axios
//     .get(route)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => console.error(err));
// }
