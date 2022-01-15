import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../reducers/chatSlice";
import userSlice from "../reducers/userSlice";

const store = configureStore({
  reducer: { chat: chatReducer, user: userSlice },
});

export default store;
