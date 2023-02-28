import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loginData.email || !loginData.password) return toast.error("Please fill all the fields")
        console.log(loginData);
        useLogin(
            { email: loginData.email, password: loginData.password },
            setError,
            dispatch,
            setLoading
        );
    }

    useEffect(() => {
        if (error.length) toast.error(error)
    }, [error])

    return (
        <div className={`w-full flex flex-col bg-[#fff] rounded justify-center items-center p-6`}>
            <form className='w-full flex flex-col items-center rounded' onSubmit={handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <Input required value={loginData[input.name as keyof LoginData] as string} onChange={(e) => { console.log("Changing " + e); setLoginData({ ...loginData, [input.name]: e.target.value }) }} input={input} key={index} />
                    ))
                }
                <div className='my-4 w-full flex items-center justify-start'>
                    <input type={"checkbox"} className="scale-150 mr-3" required />
                    <span>Remember me.</span>
                </div>
                <button type="submit" className='text-white mt-4 bg-cr-purple w-40 py-2.5 rounded cursor-pointer'>Continue</button>
            </form>

        </div>
    )
}

export default LoginForm