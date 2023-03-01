import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { BiEdit, BiLoader, BiLoaderAlt, BiTrash } from 'react-icons/bi'
import { RiCamera2Line, RiCamera3Fill, RiCheckLine, RiCloseLine, RiDeleteBackLine, RiEdit2Line, RiLoader2Line, RiLock2Line, RiLogoutBoxLine, RiMailLine, RiMore2Fill, RiUser2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CommonContext } from '../../context'
import { uploadImage, useInitiateEmailVerification, useUpdateAvatar, useUpdateUser } from '../../hooks'
import { logout } from '../../redux/slices/userSlice'
import { FormInput, User, Verification } from '../../types'
import { checkFileType } from '../../utils/file'
import Input from '../Custom/Input'

const ProfileComponent = () => {
    const { theme, currentTheme, setDeleteModal } = useContext(CommonContext)
    const user: User = useSelector((state: any) => state.user.user)
    const verification: Verification = useSelector((state: any) => state.user.verification)
    const navigate = useNavigate()
    const [viewMore, setViewMore] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [updateAvatarLoading, setUpdateAvatarLoading] = useState(false)
    const [editUser, setEditUser] = useState({
        fullname: user.fullname,
        username: user.username,
        email: user.email
    })
    const [verificationLoading, setVerificationLoading] = useState(false)

    const dispatch = useDispatch()

    const inputs: FormInput[] = [
        {
            icon: RiUser2Line,
            label: "Full Name",
            name: "fullname",
            type: "text",
            placeholder: "Enter your full name",
            required: true,
            value: user.fullname
        },
        {
            label: "Email",
            icon: RiMailLine,
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            required: true,
            value: user.email
        },
        {
            label: "Username",
            icon: RiUser2Line,
            name: "username",
            type: "text",
            placeholder: "Enter your username",
            required: true,
            value: user.username
        }
    ]
    const updateAvatar = async () => {
        toast.warn("Please wait while your avatar is uploading")
        setUpdateAvatarLoading(true)
        const element = document.querySelector("#updateAvatarID") as HTMLInputElement
        const reader = new FileReader()
        const file: File | null = element.files && element.files[0]
        if (!checkFileType("updateAvatarID")) return toast.error("Only png and jpeg images are allowed")
        if (!file) return toast.error("Oops you image failed to upload try again!")
        reader.addEventListener('loadend', async () => {
            const imageUrl = await uploadImage(reader.result as string, setUpdateAvatarLoading)
            useUpdateAvatar(imageUrl, dispatch, setUpdateAvatarLoading)
        })
        reader.readAsDataURL(file as File)
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        useUpdateUser(editUser, dispatch, setLoading, setEditMode, setViewMore)
    }
    const updatePassword = async () => {
        window.location.replace("/auth/forgot-password")
    }
    const verifyEmail = () => {
        setVerificationLoading(true)
        useInitiateEmailVerification(setVerificationLoading)
    }

    const logUserOut = () => {
        dispatch(logout())
        window.location.replace("/auth/login")
    }

    useEffect(() => {
        document.title = "Profile | Chat Rode"
    }, [])

    return (
        <div className='w-full relative flex flex-col items-start px-6 pt-6 justify-start'>
            {
                viewMore &&
                (<Fade>
                    <div className={`top-14 z-[4] -right-36 text-base absolute rounded flex flex-col p-3 shadow-lg shadow-slate-500 ${currentTheme === "dark" ? "bg-slate-500 text-white" : "bg-white text-slate-600"}`}>
                        <span className="my-1 px-3 py-2 cursor-pointer flex items-center justify-start hover:bg-slate-200 rounded" onClick={() => setEditMode(!editMode)}>{
                            editMode
                                ?
                                <>
                                    <BiEdit className='mr-2 text-cr-purple' size={20} />Leave Edit
                                </>
                                :
                                <>
                                    <BiEdit className='mr-2 text-cr-purple' size={20} />Edit
                                </>
                        }
                        </span>
                        {!verification.verified && (<span className='my-1 px-3 hover:bg-slate-300 flex items-center cursor-pointer justify-start rounded py-2 ' onClick={verifyEmail}> {
                            verificationLoading
                                ?
                                <BiLoaderAlt className='animate-spin mr-2' size={20} />
                                :
                                <RiCheckLine className='mr-2' size={20} />
                        }
                            Verify Account</span>)}
                        <span className='my-1 px-3 hover:bg-slate-300 flex items-center cursor-pointer rounded py-2 ' onClick={updatePassword}> <RiLock2Line className='mr-2' size={20} /> Update Password</span>
                        <span className='my-1 px-3 hover:bg-slate-300 flex items-center cursor-pointer  rounded py-2 ' onClick={logUserOut}> <RiLogoutBoxLine className='mr-2' size={20} /> Logout</span>
                        <span className='my-1 px-3 cursor-pointer hover:bg-slate-300 flex items-center rounded py-2 text-red-600' onClick={() => setDeleteModal(true)}> <BiTrash className='mr-2' size={20} /> Delete Account</span>
                    </div>
                </Fade>)

            }

            <div className='w-full flex justify-between items-center'>
                <span className='font-bold text-xl'>My Profile</span>
                {
                    viewMore
                        ?
                        <RiCloseLine onClick={() => setViewMore(!viewMore)} title='More' className='cursor-pointer' size={20} />
                        :
                        <RiMore2Fill onClick={() => setViewMore(!viewMore)} title='More' className='cursor-pointer' size={20} />
                }
            </div>

            <div className='my-12 flex flex-col m-auto items-center justify-center'>
                <label htmlFor='updateAvatarID' title='Update Avatar' className='relative cursor-pointer mb-4'>
                    <div onMouseEnter={() => {
                        const elt = document.querySelector(".camera") as HTMLElement
                        elt.classList.replace("hidden", "flex")
                    }}
                        onMouseLeave={() => {
                            const elt = document.querySelector(".camera") as HTMLElement
                            elt.classList.replace("flex", "hidden")
                        }}
                        className={`w-full h-full flex items-center justify-center ${updateAvatarLoading ? "bg-black/70 " : " hover:bg-black/60 "} absolute rounded-full`}>
                        {
                            updateAvatarLoading
                                ?
                                <RiLoader2Line className='text-4xl text-white animate-spin' />
                                :
                                <RiCamera2Line className='camera hidden text-white text-2xl' />}
                    </div>
                    <img src={user.avatar} className="w-24 h-24 rounded-full object-cover avatar" loading='lazy' alt="" />
                </label>
                <input onChange={() => updateAvatar()} type="file" accept='image/jpeg,image/png' id='updateAvatarID' className='hidden' />
                <span className='font-bold text-xl mt-3'>
                    {user.fullname}
                </span>
                <span className='mt-4 flex items-center justify-center'>
                    <div className={`p-[6px] mr-1 rounded-full ${user.active ? "bg-green-600" : "bg-slate-500"}`}></div>
                    {
                        user.active
                            ?
                            "Active"
                            :
                            "Away"
                    }
                </span>
                <span>{user.profileStatus && user.profileStatus}</span>
            </div>

            <div className='border w-full border-slate-400'></div>
            <div className='w-full flex flex-col pt-5'>
                <span className='font-bold text-lg'>About</span>
                <div className='flex flex-col my-6 pl-4'>
                    {
                        editMode
                            ?
                            <section className='flex flex-col'>
                                <form onSubmit={handleSubmit}>

                                    {
                                        inputs.map((input, index) => (
                                            <Input value={editUser[input.name as keyof { fullname: string }]} onChange={(e) => setEditUser({ ...editUser, [input.name]: e.target.value })} input={input} key={index} />
                                        ))
                                    }
                                    <button disabled={loading} type="submit" className='text-white mt-4 items-center justify-center bg-cr-purple w-40 h-11 rounded cursor-pointer'>
                                        {
                                            loading
                                                ?
                                                <BiLoaderAlt className='m-auto animate-spin' size={25} />
                                                :
                                                "Save"
                                        }
                                    </button>
                                </form>
                            </section>
                            :
                            <section className='flex flex-col'>
                                <div className='flex my-2 flex-col items-start justify-start'>
                                    <span className='font-bold'>Full Names</span>
                                    <span className='text-lg'>{user.fullname}</span>
                                </div>
                                <div className='flex my-2 flex-col items-start justify-start'>
                                    <span className='font-bold'>Username</span>
                                    <span className='text-lg'>{user.username}</span>
                                </div>
                                <div className='flex my-2 flex-col items-start justify-start'>
                                    <span className='font-bold'>Email</span>
                                    <span className='text-lg'>{user.email}</span>
                                </div>
                                <span title='Click on the dots in the top right corner of this middle section to verify your account' className='text-lg italic mt-6 text-red-400'>{!verification.verified && "Email unverified"}</span>
                            </section>
                    }
                </div>
                <span className='font-bold text-lg'>Files</span>
                <div className='flex flex-col italic pl-4'>
                    {
                        <section className='flex items-center flex-col'>
                            <span>
                                You have not shared any files via ChatRode
                            </span>
                            <Link to={"/chat"} className="text-cr-purple underline" >Start sharing</Link>
                        </section>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent