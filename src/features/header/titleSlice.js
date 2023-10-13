import { createSlice } from "@reduxjs/toolkit";
let t = localStorage.getItem("title") || "Dashboard";

const initialState = {
  title: t,
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setName: (state, action) => {
      localStorage.setItem("title", action.payload);

      state.title = action.payload;
    },
    clearTitle: (state) => {
      localStorage.removeItem("title");
      localStorage.removeItem("p");
      state.title = "Dashboard";
    },
  },
});

export const { setName, clearTitle } = titleSlice.actions;

export default titleSlice.reducer;
