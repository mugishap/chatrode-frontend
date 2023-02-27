import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CommonContext } from '../../context'
import { useSignup } from '../../hooks'
import { FormInput, SignupData } from '../../types'
import Input from '../Custom/Input'

interface Props {
    inputs: FormInput[]
}

const SignupForm: React.FC<Props> = ({ inputs }) => {

    const { theme } = useContext(CommonContext)
    const [signupData, setSignupData] = useState<SignupData>({
        fullName: "",
        email: "",
        password: "",
        username: "",
    })

    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(signupData);
        useSignup(
            { ...signupData },
            setError,
            dispatch,
            setLoading
        );
        console.log(signupData);
    }

    return (
        <div className={`w-full flex flex-col bg-[#fff] rounded justify-center items-center p-6`}>
            <form className='w-full flex flex-col items-center rounded' onSubmit={handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <Input required value={signupData[input.name as keyof SignupData] as string} onChange={(e) => setSignupData({ ...signupData, [input.name]: e.target.value })} input={input} key={index} />
                    ))
                }
                <button type="submit" className='text-white mt-4 bg-cr-purple w-40 py-2.5 rounded cursor-pointer'>Register</button>
            </form>
            <span className='mt-4'>By registering you agree to the <Link className='font-bold text-cr-purple' to={"/terms"}>
                Chat Rode Terms of Use
            </Link>
            </span>
        </div>
    )
}

export default SignupForm