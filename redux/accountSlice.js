import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    token: "",
    info: "",
  },
  reducers: {
    setInfoLogin: (state, action) => {
      const { token, info } = action.payload;
      state.token = token;
      state.info = info;
    },
    logout: (state, action) => {
      state.info = "";
      state.token = null;
    },
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token;
    },
    setProfileAuth: (state, action) => {
      const info = action.payload;
      state.info = info;
    },
    clearInfo: (state) => {
      state.info = null;
      state.token = "";
    },
  },
});

export const { setInfoLogin, logout, setProfileAuth, setToken, clearInfo } =
  accountSlice.actions;

export default accountSlice.reducer;
