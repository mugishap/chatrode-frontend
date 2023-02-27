import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

const user: User = {
  _id: "",
  fullname: "",
  username: "",
  email: "",
  accountStatus: "",
  profileStatus: "",
  profileImage: "",
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
    user
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = { ...payload };
    },
    logout: (state) => {
      state.user = {
        _id: "",
        email: "",
        fullname: "",
        username: "",
      };
    },
    update: (state, { payload }) => {
      state.user = { ...payload };
    }
  }
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
