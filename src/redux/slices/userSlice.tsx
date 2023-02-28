import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

const user: User = {
  _id: "",
  fullname: "",
  username: "",
  email: "",
  accountStatus: "",
  profileStatus: "",
  avatar: "",
  coverImage: "",
  password: "",
  createdAt: "",
  updatedAt: "",
  passwordReset: "",
  verification: ""
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user,
    isLoggedIn: false,
    token: null
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = { ...payload };
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = {
        _id: "",
        email: "",
        fullname: "",
        username: "",
      };
      state.isLoggedIn = false
    },
    update: (state, { payload }) => {
      state.user = { ...payload };
    }
  }
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
