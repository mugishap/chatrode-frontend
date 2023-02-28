import React, { FormEvent, useEffect, useState } from 'react'
import { RiLock2Line, RiMailAddLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../../components/Custom/Input';
import { useResetPassword } from '../../../hooks';
import { FormInput } from '../../../types';
import logo from './../../../assets/logo.svg'

const ResetPassword = () => {

  const [formData, setFormData] = useState({
    password: ""
  })
  const { passwordResetToken } = useParams()

  const inputs: FormInput[] = [
    {
      name: "password",
      type: "password",
      placeholder: "Enter password here",
      icon: RiLock2Line,
      required: true,
      label: "Password"
    }
  ]
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.password) toast.error("Password is required")
    useResetPassword(passwordResetToken as string, formData.password)
  }

  useEffect(() => {
    document.title = "New Password | ChatRode"
  }, [])
  return (
    <div className='w-full h-full flex items-start pt-16 justify-center'>
      <div className='flex w-11/12 msm:w-8/12 mlg:w-6/12 lg:w-4/12 xl:w-3/12 flex-col items-center '>
        <div className='flex items-end mb-8 justify-center'>
          <img src={logo} className="w-10" alt="Logo for Chat Rode" />
          <span className='font-bold text-xl text-slate-500 mb-2'>Chat Rode</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-bold text-xl my-3'>New Password</span>
          <span className='font-medium text-[15px] mb-6'>Enter your new password.</span>
        </div>
        <div className={`w-full flex flex-col bg-[#fff] rounded justify-center items-center p-6`}>
          <form className='w-full flex flex-col items-center rounded' onSubmit={handleSubmit}>
            {
              inputs.map((input, index) => (
                <Input required value={formData['password']} onChange={(e) => setFormData({ ...formData, password: e.target.value })} input={input} key={index} />
              ))
            }
            <button type="submit" className='text-white mt-4 bg-cr-purple w-fit px-3 py-2.5 rounded cursor-pointer'>Continue</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword