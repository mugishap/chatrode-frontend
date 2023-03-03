import React, { useContext, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { CommonContext } from '../../context'
import { useLogin } from '../../hooks'
import { FormInput, LoginData } from '../../types'
import Input from '../Custom/Input'

interface Props {
    inputs: FormInput[]
}

const LoginForm: React.FC<Props> = ({ inputs }) => {

    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const { dispatch } = useContext(CommonContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loginData.email || !loginData.password) return toast.error("Please fill all the fields")
        useLogin(
            { email: loginData.email, password: loginData.password },
            dispatch,
            setLoading
        );
    }

    return (
        <div className={`w-full flex flex-col bg-[#fff] rounded justify-center items-center p-6`}>
            <form className='w-full flex flex-col items-center rounded' onSubmit={handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <Input required value={loginData[input.name as keyof LoginData] as string} onChange={(e) => setLoginData({ ...loginData, [input.name]: e.target.value })} input={input} key={index} />
                    ))
                }
                <div className='my-4 w-full flex items-center justify-start'>
                    <input type={"checkbox"} className="scale-150 mr-3" />
                    <span>Remember me.</span>
                </div>
                <button disabled={loading} type="submit" className='text-white mt-4 items-center justify-center bg-cr-purple w-40 h-11 rounded cursor-pointer'>
                    {
                        loading
                            ?
                            <BiLoaderAlt className='m-auto animate-spin' size={25} />
                            :
                            "Continue"
                    }
                </button>
            </form>

        </div>
    )
}

export default LoginForm