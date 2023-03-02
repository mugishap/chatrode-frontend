import React, { ReactNode, useContext, useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { CommonContext } from "../../context";
import { useGetAllUsers } from "../../hooks";
import Navbar from "../Admin/Navbar";
import Sidebar from "../Chat/Sidebar/Sidebar";


const CommonAdminComponent: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { theme } = useContext(CommonContext)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(() => {
        useGetAllUsers(setLoading,dispatch)
    }, [])
    return (
        <div style={{ color: `${theme.color}`, backgroundColor: `${theme.sidebarBackgroundColor}` }} className="relative min-h-screen max-w-screen flex flex-row justify-between">
            <Sidebar />
            <div className="w-full h-full flex flex-col">
                <Navbar />
                <div className="w-full h-full flex flex-col items-center">
                    {loading ?
                        <span className="flex flex-col">
                            <BiLoaderAlt className="text-cr-purple animate-spin" size={40} />
                            <span className="text-sm">Loading...</span>
                        </span> : children}
                </div>
            </div>
        </div>
    );
};

export default CommonAdminComponent;
