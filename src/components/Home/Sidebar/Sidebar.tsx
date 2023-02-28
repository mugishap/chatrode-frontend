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
        <div style={{ backgroundColor: `${theme.sidebarBackgroundColor}` }} className='w-32 h-screen shadow-lg flex flex-col items-center justify-between py-6 text-slate-300'>
            <div className='logo'>
                <img src={logo} className="w-10" alt="" />
            </div>
            <div>
                {
                    sideBarLinks.map((link, index) => (
                        <Link title={link.label} to={link.path} key={index} className={`${window.location.pathname.slice(1) === link.name ? "text-cr-purple bg-slate-600" : ""} hover:bg-slate-600 rounded p-4 my-2 flex items-center justify-center w-full h-12`}>
                            <link.icon className={`text-2xl`} color={`${window.location.pathname.slice(1) === link.name ? "#7269ef" : "white"}`} />
                        </Link>
                    ))
                }
            </div>
            <div className='flex flex-col items-center justify-center hover:bg-slate-600 hover:text-cr-purple'>
                <div className='my-2' onClick={setCurrentTheme(currentTheme == "light" ? "dark" : "light")}>
                    {
                        currentTheme === "dark"
                            ?
                            <RiMoonLine />
                            :
                            <RiSunLine />
                    }
                </div>
                <img src={user.avatar} className='w-10 h-10 rounded-full my-2 object-cover' alt="" />
            </div>
        </div>
    )
}

export default Sidebar