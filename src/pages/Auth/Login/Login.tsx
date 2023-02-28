import React, { useEffect } from 'react'
import { FormInput } from '../../../types'
import logo from './../../../assets/logo.svg'
import { RiLock2Line, RiMailLine, RiUser2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import LoginForm from '../../../components/Auth/LoginForm'


const Login = () => {
  const inputs: FormInput[] = [

    {
      label: "Email",
      icon: RiMailLine,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
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
          <img src={logo} className="w-10" alt="Logo for Chat Rode" />
          <span className='font-bold text-xl text-slate-500 mb-2'>Chat Rode</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-bold text-xl my-3'>Sign in</span>
          <span className='font-medium text-[15px] mb-6'>Sign in to continue to Chatvia.</span>
        </div>
        <LoginForm inputs={inputs} />
        <section className='mt-6'>
          <span className='mt-4'>
            <span>
              New to ChatRode? &nbsp;
            </span>
            <Link className='font-bold text-cr-purple' to={"/auth/register"}>
              Create Account
            </Link>
          </span>
        </section>
      </div>
    </div>
  )
}

export default Login