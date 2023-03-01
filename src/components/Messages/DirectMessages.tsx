import React from 'react'
import Search from './Search'

const DirectMessages = () => {

  const messages = [
    {
      _id: "63fe3ca756a0114b3d244899",
      fullname: "Mugisha Precieux",
      username: "mugishap1",
      email: "precieuxmugisha@gmail.com",
      avatar: "",
      coverImage: "",
      online: false,
      role: "NORMAL",
      password: "$2a$08$vCaj5Ly4QZiVg1fMLeuokOaQoNJlXgOXFCjLybJNcW68H0v3H4Aq.",
      createdAt: "1677605126799",
      updatedAt: "1677605126799",
      __v: 0,
      lastMessage:{
        author:"You",
        
      }
    }
  ]

  return (
    <div className='w-full flex pt-8 flex-col'>
      <div className='w-full px-4 h-fit'>
        <span className='font-bold text-xl'>Direct Messages</span>
        <Search />
      </div>
    </div>
  )
}

export default DirectMessages