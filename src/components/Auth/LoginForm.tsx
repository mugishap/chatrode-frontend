import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CommonContext } from '../../context'
import { FormInput, LoginData } from '../../types'
import Input from '../Custom/Input'

interface Props {
    inputs: FormInput[]
}

const LoginForm: React.FC<Props> = ({ inputs }) => {

    const { theme } = useContext(CommonContext)
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
        showPassword: false
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(loginData);
    }

    return (
        <div className={`w-full flex flex-col bg-[#fff] rounded justify-center items-center p-6`}>
            <form className='w-full flex flex-col items-center rounded' onSubmit={handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <Input required value={loginData[input.name as keyof LoginData] as string} onChange={(e) => setLoginData({ ...loginData, [input.name]: e.target.value })} input={input} key={index} />
                    ))
                }
                <button type="submit" className='text-white mt-4 bg-cr-purple w-40 py-2.5 rounded cursor-pointer'>Continue</button>
            </form>

        </div>
    )
}

export default LoginForm