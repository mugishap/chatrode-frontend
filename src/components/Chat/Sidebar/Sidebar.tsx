import React, { useContext } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CommonContext } from '../../../context'
import { SidebarLinks } from '../../../types'
import logo from "./../../../assets/logo.svg"

interface Props {
    sideBarLinks: SidebarLinks[],
    active: string,
    setActive: Function
}

const Sidebar: React.FC<Props> = ({ sideBarLinks }) => {

    const user = useSelector((state: any) => state.user.user)
    const { theme, currentTheme, setCurrentTheme } = useContext(CommonContext)
    return (
        <div style={{ backgroundColor: `${theme.sidebarBackgroundColor}` }} className='w-20 h-screen shadow-lg shadow-gray-300 flex flex-col items-center justify-between py-6 text-slate-300'>
            <div className='logo'>
                <img src={logo} className="w-8" alt="" />
            </div>
            <div>
                {
                    sideBarLinks.map((link, index) => (
                        <Link title={link.label} to={link.path} key={index} className={`${window.location.pathname.slice(1) === link.name ? "text-cr-purple bg-slate-300" : ""} hover:bg-slate-200 duration-75 hover:text-cr-purple rounded p-4 my-2 flex items-center justify-center w-full h-12`}>
                            <link.icon className={`text-2xl duration-75`} />
                        </Link>
                    ))
                }
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