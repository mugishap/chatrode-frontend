import { api } from "../api";
import { login } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { Dispatch } from "@reduxjs/toolkit";

export const useLogin = async (
  user: { email: string; password: string },
  setError: any,
  dispatch: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/auth/login", user);
    const response = request.data;
    window.location.reload();
    dispatch(login({ ...response.data.user }));
    localStorage.setItem("access_token", response.data.token);
    toast.success("Logged in successfully!");
    window.location.replace("/")
  } catch (error: any) {
    setError(error.response.data.message);
  } finally {
    setLoading(false);
  }
};


export const useSignup = async (
  user: {
    fullname?: string;
    username?: string;
    email?: string;
    password?: string;
  },
  setError: any,
  dispatch: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/user/register", {
      ...user
    });
    const response = await request.data;
    console.log(response);
    dispatch(login({ ...response.data.user }));
    localStorage.setItem("access_token", response.data.token)
    toast.success("Account created successfully!");
    window.location.replace("/")
  } catch (error: any) {
    setError(`${error.response.data.message}`);
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
    const request = await api.get("/user/all");
    const response = request.data;
    setUsers(response.data.users);
    dispatch(updateUsers(response.data.users));
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
    await api.delete(`/user/delete/${userId}`);
    toast.success("User Deleted Successfully");
  } catch (error) {
    console.log(error);
    toast.error("User Deleted Successfully");
  } finally {
    setLoading(true);
  }
};


export const useVerifyEmail = async (verificationToken: string, setLoading: Function) => {
  try {
    const request = await api.post("/auth/verify-email", { verificationToken });
    const response = request.data;
    if (!response.success) toast.error(response.mesage)
    return response;
  } catch (error: any) {
    console.log(error);
    toast.error(error.message)
  }
  finally {
    setLoading(false)
  }
}

export const useForgotPassword = async (email: string) => {
  try {
    const request = await api.post("/auth/initiate-password-reset", { email })
    const response = request.data
    if (!response.success) toast.error(response.mesage)
    toast.success("Password reset email sent successfully")
    window.location.replace("/auth/forgot-password-pending")
  } catch (error: any) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

export const useResetPassword = async (token: string, password: string) => {
  try {
    console.log(token);
    const request = await api.post("/auth/reset-password", { passwordResetToken: token, password })
    const response = request.data
    if (!response.success) toast.error(response.mesage)
    toast.success("Password reset successfully")
    window.location.replace("/auth/reset-password/sucess")
  } catch (error: any) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

export const uploadImage = async (image: string, setUpdateAvatarLoading: Function) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "utilities");
  try {
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/precieux/image/upload",
      {
        method: "post",
        body: data
      }
    );
    const urlData = await res.json();
    return urlData.secure_url;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.mesage)
    return
  }
  finally {
    setUpdateAvatarLoading(false)
  }
};
export const useUpdateAvatar = async (imageUrl: string, dispatch: Dispatch, setUpdateAvatarLoading: Function) => {
  try {
    const request = await api.post("/user/update-avatar", { avatar: imageUrl })
    const response = request.data
    console.log(response)
    if (response.success) toast.success("Profile Image updated successfully")
    dispatch(login({ ...response.data.user }))
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.mesage)
    return
  }
  finally {
    setUpdateAvatarLoading(false)
  }
}

export const useUpdateUser = async (editedUser: any, dispatch: Dispatch, setLoading: Function, setEditMode: Function, setViewMore: Function) => {
  try {
    const request = await api.put("/user/update", { ...editedUser })
    const response = request.data
    if (!response.success) toast.error(response.message)
    console.log(response);
    dispatch(login({ ...response.data.user }))
    toast.success("Profile updated successfully")
    setEditMode(false)
    setViewMore(false)
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message)
  }
  finally {
    setLoading(false)
  }
}

export const useDeleteAccount = async (password: string) => {
  try {
const request = await 
  } catch (error:any) {
    console.log(error);
    toast.error(error.response.data.mesage)
  }
  finally {
    setLoading(false)
  }
}