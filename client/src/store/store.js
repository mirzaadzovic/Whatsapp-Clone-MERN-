import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../reducers/chatSlice";
import searchSlice from "../reducers/searchSlice";
import userSlice from "../reducers/userSlice";

const store = configureStore({
  reducer: { chat: chatReducer, user: userSlice, search: searchSlice },
});

export default store;
