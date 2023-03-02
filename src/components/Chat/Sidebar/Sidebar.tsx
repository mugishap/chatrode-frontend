import React, { useContext } from 'react'
import { RiAdminLine, RiMoonLine, RiSunLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CommonContext } from '../../../context'
import { SidebarLinks, User } from '../../../types'
import logo from "./../../../assets/logo.svg"
import { RiContactsBookLine, RiContactsLine, RiGroupLine, RiHome2Fill, RiMessage3Line, RiSettings2Line, RiUser2Line } from "react-icons/ri";


const Sidebar: React.FC = ({ }) => {

    const sideBarLinks: SidebarLinks[] = [
        {
            admin: false,
            path: "/profile",
            label: "Profile",
            icon: RiUser2Line,
            exact: true,
            name: "profile"
        },
        {
            admin: false,
            path: "/chat",
            label: "Chat",
            icon: RiMessage3Line,
            exact: true,
            name: "chat"
        },
        {
            admin: false,
            path: "/groups",
            label: "Groups",
            icon: RiGroupLine,
            exact: true,
            name: "groups"
        },
        {
            admin: false,
            path: "/contacts",
            label: "Contacts",
            icon: RiContactsLine,
            exact: true,
            name: "contacts"
        },
        {
            admin: false,
            path: "/settings",
            label: "Settings",
            icon: RiSettings2Line,
            exact: true,
            name: "settings"
        },
    ]

    const user: User = useSelector((state: any) => state.user.user)
    const { theme, currentTheme, setCurrentTheme } = useContext(CommonContext)
    return (
        <div style={{ backgroundColor: `${theme.sidebarBackgroundColor}` }} className='w-20 h-screen shadow-lg shadow-gray-300 flex flex-col items-center justify-between py-6 text-slate-300'>
            <div className='logo'>
                <img src={logo} className="w-8" alt="" />
            </div>
            <div>
                {
                    (user.role === "ADMIN") && (
                        <Link title={"Admin Panel"} to={"/admin"} className={`${window.location.pathname.includes("admin") ? "text-cr-purple bg-slate-300" : ""} hover:bg-slate-200 duration-75 hover:text-cr-purple rounded p-4 my-2 flex items-center justify-center w-full h-12`}>
                            <RiAdminLine className={`text-2xl duration-75`} />
                        </Link>
                    )
                }
                {sideBarLinks.map((link, index) => (
                    <Link title={link.label} to={link.path} key={index} className={`${window.location.pathname.slice(1) === link.name ? "text-cr-purple bg-slate-300" : ""} hover:bg-slate-200 duration-75 hover:text-cr-purple rounded p-4 my-2 flex items-center justify-center w-full h-12`}>
                        <link.icon className={`text-2xl duration-75`} />
                    </Link>
                ))}
            </div>
            <div className={`flex flex-col items-center justify-center`}>
                <div className={`my-2 mb-6 cursor-pointer rounded p-4 flex items-center justify-center  ${currentTheme == "dark" ? "text-slate-200" : "text-cr-purple"} hover:bg-slate-200`} onClick={() => setCurrentTheme(currentTheme == "light" ? "dark" : "light")}>
                    {
                        currentTheme === "dark"
                            ?
                            <RiMoonLine size={20} />
                            :
                            <RiSunLine size={20} />
                    }
                </div>
                <Link to={"/profile"}>
                    <img src={user.avatar} className='w-10 h-10 rounded-full my-2 object-cover' alt="" />
                </Link>
            </div>
        </div>
    )
}

export default Sidebar