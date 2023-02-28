import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useVerifyEmail } from '../../../hooks'

const VerifyAccount = () => {

  const [loading, setLoading] = useState(true)

  const { verificationToken } = useParams()

  useEffect(() => {
    document.title = "Account Verification"
    if (verificationToken) {
      useVerifyEmail(verificationToken,setLoading)
    }
  }, [])

  return (
    <div className='w-full h-full flex items-center justify-center'>
      {
        loading
          ?
          <div className='w-screen bg-cr-dark-bg h-screen flex flex-col justify-center items-center'>
            <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-cr-purple'></div>
            <span className='font-bold mt-4'>Please wait while we verify your account</span>
          </div>
          :
          <div>

          </div>
      }
    </div>
  )
}

export default VerifyAccount