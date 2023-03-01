import React, { FormEvent, useEffect, useState } from 'react'
import { RiMailAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../../components/Custom/Input';
import { useForgotPassword } from '../../../hooks';
import { FormInput } from '../../../types';
import logo from './../../../assets/logo.svg'

const ForgotPassword = () => {

    const [formData, setFormData] = useState({
        email: ""
    })

    const inputs: FormInput[] = [
        {
            name: "email",
            type: "email",
            placeholder: "Email",
            icon: RiMailAddLine,
            required: true,
            label: "Email"
        }
    ]
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.email) toast.error("Email is required")
        useForgotPassword(formData.email)
    }

    useEffect(() => {
        document.title = "Forgot Password | ChatRode"
    }, [])
    return (
        <div className='w-full h-full flex items-start pt-16 justify-center'>
            <div className='flex w-11/12 msm:w-8/12 mlg:w-6/12 lg:w-4/12 xl:w-3/12 flex-col items-center '>
                <div className='flex items-end mb-8 justify-center'>
                    <img src={logo} className="w-10" alt="Logo for Chat Rode" />
                    <span className='font-bold text-xl text-slate-500 mb-2'>Chat Rode</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-bold text-xl my-3'>Forgot Password</span>
                    <span className='font-medium text-[15px] mb-6'>You will receive an email for password reset.</span>
                </div>
                <div className={`w-full flex flex-col bg-[#fff] rounded justify-center items-center p-6`}>
                    <form className='w-full flex flex-col items-center rounded' onSubmit={handleSubmit}>
                        {
                            inputs.map((input, index) => (
                                <Input required value={formData['email'] as string} onChange={(e) => setFormData({ ...formData, email: e.target.value })} input={input} key={index} />
                            ))
                        }
                        <button type="submit" className='text-white mt-4 bg-cr-purple w-fit px-3 py-2.5 rounded cursor-pointer'>Send Verification Email</button>
                    </form>
                    <span className='mt-4'>
                        <span>
                            No longer need to reset password? &nbsp;
                        </span>
                        <Link className='font-bold text-cr-purple' to={"/auth/login"}>
                            Login
                        </Link>
                    </span>
                    <span className='mt-2'>
                        <span>
                            or create &nbsp;
                        </span>
                        <Link className='font-bold text-cr-purple' to={"/auth/register"}>
                            New account
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword