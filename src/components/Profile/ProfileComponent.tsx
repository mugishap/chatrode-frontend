import React, { useContext, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { RiCloseLine, RiDeleteBackLine, RiMore2Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { CommonContext } from '../../context'
import { User } from '../../types'

const ProfileComponent = () => {
    const { theme, currentTheme, setDeleteModal } = useContext(CommonContext)
    const [viewMore, setViewMore] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const user: User = useSelector((state: any) => state.user.user)
    console.log(user);

    return (
        <div className='w-full relative flex flex-col items-start px-6 pt-6 justify-start'>
            {
                viewMore
                    ?
                    <div className={`top-14 right-6 text-base absolute rounded flex flex-col p-3 shadow-lg shadow-slate-500 ${currentTheme === "dark" ? "bg-slate-500 text-white" : "bg-white text-slate-600"}`}>
                        <span className="my-1 px-3 py-2 cursor-pointer flex items-center justify-start hover:bg-slate-200 rounded" onClick={() => setEditMode(!editMode)}><BiEdit className='mr-2 text-cr-purple' size={20} />Edit</span>
                        <span className='my-1 px-3 hover:bg-slate-300 flex items-center justify-center rounded py-2 text-red-600' onClick={() => setDeleteModal(true)}> <BiTrash className='mr-2' size={20} /> Delete Account</span>
                    </div>
                    :
                    null
            }

            <div className='w-full flex justify-between items-center'>
                <span className='font-bold text-xl'>My Profile</span>
                {
                    viewMore
                        ?
                        <RiCloseLine onClick={() => setViewMore(!viewMore)} title='More' className='cursor-pointer' size={20} />
                        :
                        <RiMore2Fill onClick={() => setViewMore(!viewMore)} title='More' className='cursor-pointer' size={20} />
                }
            </div>

            <div className='my-12 flex flex-col m-auto items-center justify-center'>
                <img src={user.avatar} className="w-20 h-20 rounded-full mb-4" alt="" />
                <span className='font-bold text-xl mt-3'>
                    {user.fullname}
                </span>
                <span className='mt-4 flex items-center justify-center'>
                    <div className={`p-[6px] mr-1 rounded-full ${user.active ? "bg-green-600" : "bg-slate-500"}`}></div>
                    {
                        user.active
                            ?
                            "Active"
                            :
                            "Away"
                    }
                </span>
            </div>

            <div className='border w-full border-slate-400'></div>
            <div className='w-full flex flex-col pt-5'>
                <span className='font-bold text-lg'>About</span>
                
            </div>
        </div>
    )
}

export default ProfileComponent