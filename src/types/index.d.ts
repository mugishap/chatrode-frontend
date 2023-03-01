import IcontType from "react-icons/lib/cjs/iconBase.d.ts"

export interface User {
    active?: boolean
    avatar?: string
    role?: string
    _id: string,
    fullname: string,
    username: string,
    email: string,
    accountStatus?: string,
    profileStatus?: string,
    coverImage?: string,
    password?: string,
    createdAt?: string,
    updatedAt?: string,
    passwordReset?: string,
    verification?: string
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
    required: boolean,
    value?: string

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

export interface Verification {
    user?: string,
    verified?: boolean,
    verifiedAt?: string
}