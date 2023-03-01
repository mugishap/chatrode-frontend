import React, { FormEvent, useContext, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { BiEdit, BiLoader, BiLoaderAlt, BiTrash } from 'react-icons/bi'
import { RiCamera2Line, RiCamera3Fill, RiCloseLine, RiDeleteBackLine, RiEdit2Line, RiLoader2Line, RiMailLine, RiMore2Fill, RiUser2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CommonContext } from '../../context'
import { uploadImage, useUpdateAvatar, useUpdateUser } from '../../hooks'
import { FormInput, User } from '../../types'
import Input from '../Custom/Input'

const ProfileComponent = () => {
    const { theme, currentTheme, setDeleteModal } = useContext(CommonContext)
    const user: User = useSelector((state: any) => state.user.user)

    const [viewMore, setViewMore] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [imageString, setImageString] = useState("")
    const [loading, setLoading] = useState(false)
    const [updateAvatarLoading, setUpdateAvatarLoading] = useState(false)
    const [editUser, setEditUser] = useState({
        fullname: user.fullname,
        username: user.username,
        email: user.email
    })


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
        console.log("Hellooo");
        const element = document.querySelector("#updateAvatarID") as HTMLInputElement
        console.log(element);
        const reader = new FileReader()
        const file = element.files ? element.files[0] : null
        reader.addEventListener('loadend', async () => {
            const image = document.querySelector(".avatar") as HTMLImageElement
            image.src = reader.result as string
            console.log(reader.result);
            setImageString(reader.result as string)
            const imageUrl = await uploadImage(imageString, setUpdateAvatarLoading)
            console.log(imageUrl);
            useUpdateAvatar(imageUrl, dispatch, setUpdateAvatarLoading)
        })
        reader.readAsDataURL(file as File)
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        useUpdateUser(editUser, dispatch, setLoading, setEditMode, setViewMore)
    }
    return (
        <div className='w-full relative flex flex-col items-start px-6 pt-6 justify-start'>
            {
                viewMore
                    ?
                    <Fade>
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
                            <span className='my-1 px-3 hover:bg-slate-300 flex items-center justify-center rounded py-2 text-red-600' onClick={() => setDeleteModal(true)}> <BiTrash className='mr-2' size={20} /> Delete Account</span>
                        </div>
                    </Fade>
                    :
                    null
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
                <input onChange={() => updateAvatar()} type="file" accept='image/*' id='updateAvatarID' className='hidden' />
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