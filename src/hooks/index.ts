import { api } from "../api";
import { login } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

export const useLogin = async (
  user: { email: string; password: string },
  setError: any,
  login: any,
  dispatch: any,
  setLoginPage: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/user/login", user);
    const response = request.data;
    window.location.reload();
    dispatch(login({ ...response.user, token: response.token }));
    setLoginPage(false);
    localStorage.setItem("token", response.token);
    toast.success("Logged in successfully!");
  } catch (error: any) {
    setError(error.response.data.message);
  } finally {
    setLoading(false);
  }
};


export const useSignup = async (
  user: {
    fullname: string;
    email: string;
    password: string;
    username: string;
    profileImage: any;
  },
  setError: any,
  dispatch: any,
  setLoginPage: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/user/register", {
      ...user,
      joined: new Date()
    });
    const response = await request.data;
    dispatch(login({ ...response.user, token: response.token }));
    setLoginPage(false);
    toast.success("Account created successfully!");
    window.location.reload();
  } catch (error: any) {
    setError(`${error.response.data.content}`);
    console.log(error);
  } finally {
    setLoading(false);
  }
};


export const getUsers = async (
  token: string,
  setUsers: Function,
  dispatch: any,
  updateUsers: any
) => {
  try {
    const request = await api.get("/user/all", {
      headers: {
        authorization: token
      }
    });
    const response = request.data;
    setUsers(response.users);
    dispatch(updateUsers(response.users));
  } catch (error) {
    console.log(error);
  }
};


export const deleteUser = async () => {
  try {
    const request = await api.delete("/user/delete");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserByAdmin = async (
  token: string,
  userId: string,
  toast: any,
  setLoading: Function
) => {
  try {
    setLoading(true);
    await api.delete(`/user/delete/${userId}`, {
      headers: {
        authorization: token
      }
    });
    toast.success("User Deleted Successfully");
  } catch (error) {
    console.log(error);
    toast.error("User Deleted Successfully");
  } finally {
    setLoading(true);
  }
};
