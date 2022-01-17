import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
    searchUsers: null,
  },
  reducers: {
    setSearchInput: (state, action) => {
      console.log("STATE: " + action.payload);
      return {
        ...state,
        searchInput: action.payload,
      };
    },
    setSearchUsers: (state, action) => ({
      ...state,
      searchUsers: action.payload,
    }),
  },
});

export const { setSearchInput, setSearchUsers } = searchSlice.actions;
export const selectSearchInput = (state) => state.search.searchInput;
export const selectSearchUsers = (state) => state.search.searchUsers;

export default searchSlice.reducer;
