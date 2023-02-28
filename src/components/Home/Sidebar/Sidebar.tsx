import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SidebarLinks } from '../../../types'
import logo from "./../../../assets/logo.svg"

interface Props {
    sideBarLinks: SidebarLinks[],
    active: string,
    setActive: Function
}

const Sidebar: React.FC<Props> = ({ sideBarLinks, active, setActive }) => {

    const user = useSelector((state: any) => state.user.user)

    return (
        <div className='w-32 h-screen flex flex-col items-center justify-between py-6 bg-gray-700 text-slate-300'>
            <div className='logo'>
                <img src={logo} className="w-10" alt="" />
            </div>
            <div>
                {
                    sideBarLinks.map((link, index) => (
                        <Link onClick={() => setActive(link.name)} title={link.label} to={link.path} key={index} className={`${active === link.name ? "text-cr-purple bg-slate-600" : ""} hover:bg-slate-600 rounded p-4 my-2 flex items-center justify-center w-full h-12`}>
                            <link.icon className={`text-2xl`} color={`${active === link.name ? "#7269ef" : "white"}`} />
                        </Link>
                    ))
                }
            </div>
            <div className='flex flex-col items-center justify-center'>
                <img src={user.avatar} className='w-10 h-10 rounded-full object-cover' alt="" />
            </div>
        </div>
    )
}

export default Sidebar