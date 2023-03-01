import { api } from "../api";
import { login, logout, setToken, setVerification } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { Dispatch } from "@reduxjs/toolkit";
import { wait } from "../utils/wait";

export const useLogin = async (
  user: { email: string; password: string },
  dispatch: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/auth/login", user);
    const response = request.data;
    dispatch(login({ ...response.data.user }));
    dispatch(setVerification({ ...response.data.verification }));
    dispatch(setToken(response.data.token));
    localStorage.setItem("access_token", response.data.token);
    toast.success("Logged in successfully!");
    window.location.replace("/")
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
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
  dispatch: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/user/register", {
      ...user
    });
    const response = await request.data;
    dispatch(login({ ...response.data.user }));
    dispatch(setVerification({ ...response.data.verification }));
    dispatch(setToken({ ...response.data.token }));
    localStorage.setItem("access_token", response.data.token)
    toast.success("Account created successfully!");
    window.location.replace("/profile")
  } catch (error: any) {
    toast.error(`${error.response.data.message}`);
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


export const useVerifyEmail = async (verificationToken: string, dispatch: Dispatch, setLoading: Function, setError: Function) => {
  try {
    const request = await api.post("/auth/verify-email", { verificationToken });
    const response = request.data;
    if (!response.success) toast.error(response.mesage)
    toast.success("Email verified successfully")
    dispatch(login({ ...response.data.user }))
    dispatch(setVerification({ ...response.data.verification }))
    return response;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message)
    setError(true)
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
    const request = await api.post("/auth/reset-password", { passwordResetToken: token, password })
    const response = request.data
    if (!response.success) toast.error(response.mesage)
    toast.success("Password reset successfully")
    window.location.replace("/auth/reset-password/success")
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
    if (error.includes("Failed to fetch")) return toast.error('Check you internet connection')
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
    if (response.success) toast.success("Profile Image updated successfully")
    dispatch(login({ ...response.data.user }));
    dispatch(setVerification({ ...response.data.verification }));
    dispatch(setVerification({ ...response.data.verification }));
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
    dispatch(login({ ...response.data.user }));
    dispatch(setVerification({ ...response.data.verification }));
    dispatch(setVerification({ ...response.data.verification }));
    toast.success("Profile updated successfully")
    if (!response.data.verification.verified) toast.warn("Remember to verify your account please!!")
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

export const useDeleteAccount = async (password: string, dispatch: Dispatch, setLoading: Function) => {
  try {
    const request = await api.post("/user/delete", { password })
    const response = request.data
    if (!response.success) toast.error(response.message)
    dispatch(logout())
    toast.success("Account deleted successfully")
    wait(2000)
    window.location.replace("/auth/register")
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message)
  }
  finally {
    setLoading(false)
  }
}

export const useInitiateEmailVerification = async (setVerificationLoading: Function) => {
  try {
    const request = await api.get("/auth/initiate-email-verification")
    const response = request.data
    if (!response.success) toast.error(response.message)
    toast.success("Check your email for verification link!!!")
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.mesage)
  }
  finally {
    setVerificationLoading(false)
  }
}