import React, { useContext } from 'react'
import { RiGroupLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { CommonContext } from '../../context'

const AdminHomeComponent = () => {
  const { currentTheme,user,users } = useContext(CommonContext)
  const stats = [
    {
      name: "Users",
      icon: RiGroupLine,
      count: users.length,
      path: "/admin/users"
    },
    {
      name: "Messages",
      icon: RiGroupLine,
      count: users.length,
      path: "/admin/messages"
    },
    {
      name: "Rooms",
      icon: RiGroupLine,
      count: users.length,
      path: "/admin/rooms"
    },
  ]
  return (
    <div className='h-full pt-8 px-8 flex flex-col w-full'>
      <span className='text-xl font-bold my-4'>Hello there, {user.fullname}</span>
      <span className='text-2xl font-bold my-4 '>Chat Rode Statistics</span>

      <div className='w-full flex items-center justify-start'>
        {
          stats.map((data, index) => (
            <Link to={data.path} key={index} className={`rounded w-2/12 mx-6 p-4 flex flex-col ${currentTheme === "light" ? "bg-white shadow-lg shadow-slate-200" : "bg-slate-400"}`}>
              <span className='flex items-center text-xl'>
                <data.icon className='mr-2' />
                <span className='font-medium'>{data.name}</span>
              </span>
              <span className='mt-4 font-bold text-2xl'>
                {data.count}
              </span>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default AdminHomeComponent