import { createSlice } from "@reduxjs/toolkit";
import { User, Verification } from "../../types";

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

const verification: Verification = {
  user: "",
  verified: false,
  verifiedAt: "",
}
const users: User[] = []
const userSlice = createSlice({
  name: "user",
  initialState: {
    user,
    isLoggedIn: false,
    token: null,
    verification,
    users
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = { ...payload };
      state.isLoggedIn = true
    },
    setVerification: (state, { payload }) => {
      state.verification = { ...payload };
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    logout: (state) => {
      state.user = {
        _id: "",
        email: "",
        fullname: "",
        username: "",
      };
      state.isLoggedIn = false
      state.token = null
      localStorage.clear()
    },
    setUsers: (state, { payload }) => {
      state.users = [...payload];
    },
    update: (state, { payload }) => {
      state.user = { ...payload };
    }
  }
});

export const { login, logout, update, setVerification, setUsers, setToken } = userSlice.actions;

export default userSlice.reducer;
