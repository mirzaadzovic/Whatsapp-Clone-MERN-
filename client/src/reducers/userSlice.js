import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
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
