import React, { useContext } from 'react'
import { CommonContext } from '../../context'
import { User } from '../../types'
import DirectMessageComponent from './DirectMessageComponent'
import Search from './Search'

const DirectMessages = () => {

  const { users } = useContext(CommonContext)

  return (
    <div className='w-full flex max-h-screen overflow-y-scroll pt-8 flex-col'>
      <div className='w-full px-4 h-fit'>
        <span className='font-bold text-xl'>Direct Messages</span>
        <Search />
      </div>
      <div className='flex flex-col items-center justify-start'>
        {
          users.map((user: User, index: number) => {
            return (
              <DirectMessageComponent key={index} user={user} />
            )
          })
        }
      </div>
    </div>
  )
}

export default DirectMessages