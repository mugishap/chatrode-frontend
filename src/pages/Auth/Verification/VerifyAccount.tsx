import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useVerifyEmail } from '../../../hooks'
import { BiLoaderAlt } from "react-icons/bi"
import { wait } from '../../../utils/wait'
import { useDispatch } from 'react-redux'
import CustomConfetti from '../../../components/Custom/CustomConfetti'

const VerifyAccount = () => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { verificationToken } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    wait(3000)
    document.title = "Account Verification"
    if (verificationToken) {
      useVerifyEmail(verificationToken, dispatch, setLoading, setError)
    }
  }, [])

  return (
    <div className='w-full h-full flex items-center justify-center'>
      {
        loading
          ?
          <div className='w-screen bg-cr-dark-bg h-screen flex flex-col justify-center items-center'>
            <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-cr-purple'></div>
            <span
              className='font-bold mt-4'>Please wait while we verify your account</span>
          </div>
          :
          <div>
            <section className="w-full     flex items-center justify-center flex-col pt-12 pb-16">
              <section className="relative flex flex-col">
                <div className="text-[#263048] text-[200px] font-bold z-50 px-6">
                  {error ? "ERROR" : "SUCCESS"}
                </div>
                <div className="absolute bg-cr-purple bottom-12 h-[30%] w-full"></div>
              </section>
              {
                error
                  ?
                  <section className="flex flex-col items-center space-y-3 pb-8">
                    <h2 className="text-[#2A2C30] font-bold text-2xl">There occured an error while verifying your account </h2>
                    <p className="text-gray-primary text-center max-w-md text-[18px]">Try again</p>
                  </section>
                  :
                  <section className="flex flex-col items-center space-y-3 pb-8">
                    <CustomConfetti />
                    <h2 className="text-[#2A2C30] font-bold text-2xl">Your email verification status </h2>
                    <p className="text-gray-primary text-center max-w-md text-[18px]">Your email has been verified successfully, Good to have you uncovered!!!</p>
                  </section>
              }
              <Link to="/">
                <button className="text-white bg-cr-purple rounded py-3 px-8 text-lg">
                  Go Back to Chat
                </button>
              </Link>
            </section>
          </div>
      }
    </div>
  )
}

export default VerifyAccount