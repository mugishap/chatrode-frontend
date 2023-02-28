import IcontType from "react-icons/lib/cjs/iconBase.d.ts"

export interface User {
    active: boolean
    avatar?: string 
    role?: string
    _id: String,
    fullname: String,
    username: String,
    email: String,
    accountStatus?: String,
    profileStatus?: String,
    coverImage?: String,
    password?: String,
    createdAt?: String,
    updatedAt?: String,
    passwordReset?: String,
    verification?: String
}

export interface Theme {
    light: ThemeType
    dark: ThemeType
}

export interface ThemeType {
    formBg: string
    addons: string
    textColor: string,
    backgroundColor: string,
    sidebarBackgroundColor: string,
    chatsColor: string,
    iconColor: string
}

export interface FormInput {
    icon: IconType
    label: string,
    name: string,
    type: string,
    placeholder: string,
    required: boolean

}

export interface SignupData {
    fullname?: string,
    email?: string,
    username?: string,
    password?: string,
}

export interface LoginData {
    email?: string,
    password?: string,
}

export interface SidebarLinks {
    icon: IconType
    label: string,
    path: string,
    exact: boolean,
    admin: boolean,
    name: string
}