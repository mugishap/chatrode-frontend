import React, { useContext, useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { CommonContext } from '../../context'
import { useSignup } from '../../hooks'
import { FormInput, SignupData } from '../../types'
import Input from '../Custom/Input'

interface Props {
    inputs: FormInput[]
}

const SignupForm: React.FC<Props> = ({ inputs }) => {

    const { theme,dispatch } = useContext(CommonContext)
    const [signupData, setSignupData] = useState<SignupData>({
        fullname: "",
        email: "",
        password: "",
        username: "",
    })

    
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        useSignup(
            { ...signupData },
            dispatch,
            setLoading
        );
    }

    return (
        <div className={`w-full flex flex-col bg-[#fff] rounded justify-center items-center p-6`}>
            <form className='w-full flex flex-col items-center rounded' onSubmit={handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <Input required value={signupData[input.name as keyof SignupData]} onChange={(e) => setSignupData({ ...signupData, [input.name]: e.target.value })} input={input} key={index} />
                    ))
                }
                <button disabled={loading} type="submit" className='text-white mt-4 items-center justify-center bg-cr-purple w-40 h-11 rounded cursor-pointer'>
                    {
                        loading
                            ?
                            <BiLoaderAlt className='m-auto animate-spin' size={25}/>
                            :
                            "Register"
                    }
                </button>
            </form>
            <span className='mt-4'>By registering you agree to the <Link className='font-bold text-cr-purple' to={"/terms"}>
                Chat Rode Terms of Use
            </Link>
            </span>
        </div>
    )
}

export default SignupForm