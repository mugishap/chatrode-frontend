import React, { useContext } from 'react'
import { CommonContext } from '../../context'
import { User } from '../../types'

interface Props {
  user: User,
}

const DirectMessageComponent: React.FC<Props> = ({ user }) => {

  const { activeRoom, setActiveRoom, onlineUsers } = useContext(CommonContext)

  return (
    <div onClick={() => setActiveRoom(user)} className='w-11/12 px-2 cursor-pointer py-1 hover:bg-slate-300 rounded flex items-center justify-start h-16 my-1'>
      <div className='w-fit h-fit relative'>
        {
          (onlineUsers as string[]).includes(user._id) &&
          <div className='p-[5px] border-2 border-white rounded-full bg-green-600 absolute top-0 right-1 z-10'></div>}
        <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
      </div>
      <div className='h-full ml-3 pt-1 flex flex-col'>
        <span className='font-medium text-[17px]' title={user.fullname}>{user.fullname}</span>
      </div>
    </div>
  )
}

export default DirectMessageComponent