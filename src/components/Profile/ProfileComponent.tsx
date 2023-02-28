import React, { useContext } from 'react'
import { CommonContext } from '../../context'

const ProfileComponent = () => {
    const {theme}=useContext(CommonContext)
    return (
        <div className='w-full flex flex-col items-center pt-6 justify-start'>
            <span className='font-bold text-xl'>Profile</span>
        </div>
    )
}

export default ProfileComponent