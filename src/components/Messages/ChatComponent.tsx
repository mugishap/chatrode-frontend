import { FormEvent, useContext, useState } from 'react'
import { BiBlock } from 'react-icons/bi'
import { RiCamera2Fill, RiCloseFill, RiFullscreenFill, RiMore2Fill, RiSendPlane2Fill, RiUpload2Fill } from 'react-icons/ri'
import { CommonContext } from '../../context'

const ChatComponent = () => {

    const { activeRoom, socket, currentTheme,user,onlineUsers } = useContext(CommonContext)

    const [message, setMessage] = useState("")
    const [viewMore, setViewMore] = useState(false)
    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit("new-message", {
            sender: user._id,
            receiver: activeRoom._id,
            content: message
        })
        setMessage("")
    }


    return (
        <div className='flex flex-col items-center w-full h-full justify-between'>
            <div className='w-full bg-white px-6 h-20 shadow-lg shadow-slate-200 flex items-center justify-between'>
                <div className='flex'>
                    <img src={activeRoom.avatar} className="w-12 h-12 mr-6 rounded-full object-cover" alt="" />
                    <div>

                        <span className='flex items-center'>
                            <span className='text-black font-bold text-[17px]'>{activeRoom.fullname}</span>
                            <span className='mx-4 bg-slate-300 rounded px-1'>AKA</span>
                            <span className='text-black font-bold text-[17px]'>{activeRoom.username}</span>
                        </span>
                        {
                            activeRoom.online ?
                                <span className='ml-1 rounded-full text-sm px-2 py-1 text-black'>Online</span>
                                :
                                <span className='ml-1 rounded-full text-sm px-1 py-1 text-black'>Offline</span>
                        }
                    </div>
                </div>
                <div className='relative'>
                    {
                        viewMore
                            ?
                            <RiCloseFill className='cursor-pointer' onClick={() => setViewMore(false)} size={25} />
                            :
                            <RiMore2Fill className='cursor-pointer' onClick={() => setViewMore(true)} size={25} />
                    }
                    {
                        viewMore && (
                            <div className={`top-6 w-52 z-[4] right-6 text-base absolute rounded flex flex-col p-3 shadow-lg shadow-slate-500 ${currentTheme === "dark" ? "bg-slate-500 text-white" : "bg-white text-slate-600"}`}>
                                <span className='my-1 px-3 hover:bg-slate-300 flex items-center cursor-pointer  rounded py-2 ' onClick={() => document.documentElement.requestFullscreen()}> <RiFullscreenFill className='mr-2' size={20} /> Enable Full Screen</span>
                                <span className='my-1 px-3 cursor-pointer hover:bg-slate-300 flex items-center rounded py-2 text-red-600'> <BiBlock className='mr-2' size={20} /> Block User</span>
                            </div>
                        )

                    }
                </div>
            </div>
            <div className=''></div>
            <div className='w-full h-32 bg-white flex flex-col'>
                <div className='w-full relative flex items-center justify-center h-full '>
                    <div className='flex flex-col bg-cr-purple absolute left-2 h-[75%] w-14 rounded top-3 items-center justify-center'>
                        <RiUpload2Fill className='text-white text-2xl my-2 cursor-pointer' title='Take picture' />
                        <RiCamera2Fill className='text-white text-2xl my-2 cursor-pointer' title='Take picture' />
                    </div>
                    <form onSubmit={sendMessage} className='w-11/12 h-24 absolute top-3 right-4'>
                        <input type={"text"} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message ${activeRoom.fullname}`} className='no-resize align-top p-2 w-full h-full rounded absolute top-0 left-0 bg-slate-200 resize-none focus:outline-cr-purple flex items-start justify-start' />
                        <button className='flex items-center  rounded px-3 py-1 text-white font-bold absolute bottom-3 right-3 bg-cr-purple' type='submit'>
                            <RiSendPlane2Fill className='pr-1' />
                            <span>|</span>
                            <span className='pl-1'>Send</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent