import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: fetchLoggedInUser() || null,
  },
  reducers: {
    logIn: (state, action) => ({
      loggedInUser: action.payload,
    }),
    logOut: () => ({ loggedInUser: null }),
  },
});

export const { logIn, logOut } = userSlice.actions;
export const selectLoggedInUser = (state) => state.user.loggedInUser;

export default userSlice.reducer;

function fetchLoggedInUser() {
  return axios.get("/auth/user").then((res) => {
    return res.data;
  });
}
