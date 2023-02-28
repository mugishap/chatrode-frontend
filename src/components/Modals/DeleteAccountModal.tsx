import React, { FormEvent, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { RiAlertLine, RiLock2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { FormInput, ThemeType } from '../../types'
import Input from '../Custom/Input'

interface Props {
    viewDeleteModal: boolean
    setViewDeleteModal: Function,
    theme: ThemeType
}

const DeleteAccountModal: React.FC<Props> = ({ theme, viewDeleteModal, setViewDeleteModal }) => {

    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // useDeleteAccount() // TODO -> implement delete account hook
    }

    const input: FormInput = {
        name: "password",
        icon: RiLock2Line,
        label: "Password",
        placeholder: "Enter your password here",
        required: true,
        type: "password"
    }

    return (
        <div className='absolute w-full h-full z-[3] bg-black/70 backdrop-blur-lg flex flex-col items-center justify-center'>
            <div className='absolute w-full h-full z-[4]' onClick={() => setViewDeleteModal(false)}></div>
            <div style={{ backgroundColor: `${theme.backgroundColor}`, color: `${theme.textColor}` }} className='px-16 w-1/2 z-[5] h-3/5 py-10 flex flex-col items-center justify-start'>
                <span className='my-3 font-bold text-2xl'>Delete your account</span>
                <div className='flex w-7/12 items-center border border-slate-300 h-20 rounded justify-between'>
                    <div className='bg-red-300  h-full flex items-center justify-center w-2/12'>
                        <RiAlertLine color='red' size={30} />
                    </div>
                    <div className=' w-4/5 pl-2'>
                        This an irreversible action!! <br></br>
                        Are you sure you want to delete your account?
                    </div>
                </div>
                <form onSubmit={handleDeleteAccount} className="w-6/12 items-center mt-6 flex flex-col">
                    <Input className='my-3' value={password} input={input} onChange={(e) => setPassword(e.target.value)} />
                    <button disabled={loading} type="submit" className='text-white mt-4 items-center justify-center bg-red-600 w-40 h-11 rounded cursor-pointer'>
                        {
                            loading
                                ?
                                <BiLoaderAlt className='m-auto animate-spin' size={25} />
                                :
                                "Proceed"
                        }
                    </button>
                </form>

                <div className='w-9/12 justify-between flex items-center mt-24'>
                    <a href={"/terms"} className='font-bold text-cr-purple'>
                        Terms & Conditions apply
                    </a>
                    <span>All rights reserved {new Date().getFullYear()}</span>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal