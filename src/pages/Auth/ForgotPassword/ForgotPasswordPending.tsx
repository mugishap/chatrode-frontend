import React from 'react'
import { RiCheckFill, RiCheckLine } from 'react-icons/ri'

const ForgotPasswordPending = () => {
    return (
        <div>
            <div className='w-full flex min-h-screen  flex-col items-center justify-start pt-16'>
                <RiCheckLine className='bg-cr-purple rounded-full mb-14 w-64 h-64 text-white' />
                <span className='font-bold text-xl'>Check your email for the verification link!!!</span>
                <a href='https://mail.google.com' className='text-white font-bold flex mt-4 items-center justify-center bg-cr-purple w-40 h-11 rounded cursor-pointer'>
                    Open Gmail
                </a>
            </div>
        </div>
    )
}

export default ForgotPasswordPending