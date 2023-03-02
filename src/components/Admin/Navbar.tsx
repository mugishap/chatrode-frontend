import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CommonContext } from '../../context'

const Navbar = () => {
    const { currentTheme } = useContext(CommonContext)
    const links = [
        {
            path: "/admin",
            label: "Dashboard",
            exact: true,
        },
        {
            path: "/admin/users",
            label: "Users",
            exact: true,
        }
    ]
    return (
        <div className={`w-full shadow-lg shadow-slate-200 h-16 ${currentTheme === "light" ? "bg-white" : "bg-slate-600"} flex items-center px-6`}>
            <div className='flex w-full items-center justify-between'>
                <span className='font-bold text-xl'>Admin Dashboard</span>
                <div className='flex'>
                    {
                        links.map((link, index) => (
                            <Link key={index} className='mx-4 hover:text-cr-purple duration-100' to={link.path}>{link.label}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar