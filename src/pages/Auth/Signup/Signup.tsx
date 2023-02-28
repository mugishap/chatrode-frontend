import React, { useEffect } from 'react'
import SignupForm from '../../../components/Auth/SignupForm'
import { FormInput } from '../../../types'
import logo from './../../../assets/logo.svg'
import { RiLock2Line, RiMailLine, RiUser2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'


const Signup = () => {
  const inputs: FormInput[] = [
    {
      icon: RiUser2Line,
      label: "Full Name",
      name: "fullname",
      type: "text",
      placeholder: "Enter your full name",
      required: true
    },
    {
      label: "Email",
      icon: RiMailLine,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true
    },
    {
      label: "Username",
      icon: RiUser2Line,
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      required: true
    },
    {
      label: "Password",
      icon: RiLock2Line,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true
    },
  ]

  useEffect(() => {
    document.title = 'Register | Chat Rode'
  }, [])
  return (
    <div className='w-screen h-screen flex items-start pt-16 justify-center'>
      <div className='flex w-11/12 msm:w-8/12 mlg:w-6/12 lg:w-4/12 xl:w-3/12 flex-col items-center '>
        <div className='flex items-end mb-8 justify-center'>
          <img src={logo} className="w-16" alt="Logo for Chat Rode" />
          <span className='font-bold text-xl text-slate-500 mb-2'>Chat Rode</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-bold text-xl my-3'>Sign up</span>
          <span className='font-medium text-[15px] mb-6'>Get your Chat Rode account now</span>
        </div>
        <SignupForm inputs={inputs} />
        <section className='mt-6'>
          <span className='mt-4'>
            <span>
              Already have an account? &nbsp;
            </span>
            <Link className='font-bold text-cr-purple' to={"/auth/login"}>
              Login
            </Link>
          </span>
        </section>
      </div>
    </div>
  )
}

export default Signup