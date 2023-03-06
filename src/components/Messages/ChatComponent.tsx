import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { BiBlock } from 'react-icons/bi'
import { RiCamera2Fill, RiCloseFill, RiFullscreenFill, RiMore2Fill, RiSendPlane2Fill, RiUpload2Fill } from 'react-icons/ri'
import { CommonContext } from '../../context'
import { Message } from '../../types'

const ChatComponent = () => {

    const { activeRoom, socket, currentTheme, user, onlineUsers } = useContext(CommonContext)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])
    const [viewMore, setViewMore] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const sendMessage = (e: FormEvent<HTMLFormElement> | null) => {
        e?.preventDefault()
        console.log("Hello");
        socket.emit("new-message", {
            sender: user._id,
            receiver: activeRoom._id,
            content: message.trim()
        })
        console.log({
            sender: user._id,
            receiver: activeRoom._id,
            content: message.trim()
        });

        setMessages([...messages, {
            sender: user._id,
            receiver: activeRoom._id,
            content: message.trim()
        }])
        setMessage("")
    }
    useEffect(() => {
        textAreaRef.current?.focus()
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!message) return
            if (e.key === "Enter" && e.shiftKey === false) {
                console.log("Enter clicked");
                e.preventDefault();
                sendMessage(null)
            }
        };
        textAreaRef.current?.addEventListener("keydown", handleKeyDown)
        setMessage("")
        setMessages([])
        return () => {
            textAreaRef.current?.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeRoom])
    useEffect(() => {
        socket.emit("load-messages", ({ sender: user._id, receiver: activeRoom._id }))
    }, [activeRoom])

    //Sockets impl

    socket.on("loaded-messages", (loadedMessages: any) => {
        console.log(loadedMessages);
        setMessages(loadedMessages)
    })

    socket.on("notification", ({ receiver, newMessage }: { receiver: string, newMessage: Message }) => {
        console.log(receiver, user._id);
        if (receiver != user._id) return
        // console.log(receiver, newMessage);
        setMessages([...messages, newMessage])
    })

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
                            onlineUsers.includes(activeRoom._id) ?
                                <span className='ml-1 rounded-full text-sm px-2 py-1 text-black'>
                                    {(activeRoom._id === user._id) ? <span>This is your own space feel free to store anything here!!</span> : <span>Online</span>}
                                </span>
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
                                <span className='my-1 px-3 hover:bg-slate-300 flex items-center cursor-pointer  rounded py-2 ' onClick={() => {
                                    document.documentElement.requestFullscreen()
                                    setViewMore(false)
                                }}> <RiFullscreenFill className='mr-2' size={20} /> Enable Full Screen</span>
                                <span className='my-1 px-3 cursor-pointer hover:bg-slate-300 flex items-center rounded py-2 text-red-600'> <BiBlock className='mr-2' size={20} /> Block User</span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='flex max-h-[80vh] overflow-scroll items-end justify-end pb-4 flex-col w-full px-4'>
                {
                    messages.map((message: Message, index: number) => {
                        console.log(message.sender, user._id);
                        return (
                            <div className={`w-full my-2 py-1 rounded flex items-center ${message?.sender === user._id ? "justify-end" : "justify-start"}`}>
                                <span className={`bg-cr-purple py-1 max-w-44 rounded-xl text-white px-3`}>
                                    {message.content}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            <div className='w-full h-24 bg-white flex flex-col'>
                <div className='w-full flex items-center justify-center h-full '>
                    <div className='flex flex-row h-14 w-1/12 rounded items-center justify-center'>
                        <div className='p-2 item-center bg-cr-purple mx-1 h-full flex items-center justify-center rounded'>
                            <RiUpload2Fill className='text-white text-2xl rounded cursor-pointer' title='Upload a file' />
                        </div>
                    </div>
                    <form onSubmit={sendMessage} ref={formRef} className='w-11/12 h-14 relative right-4'>
                        <textarea ref={textAreaRef} value={message} id={"message-textarea"} onChange={(e) => setMessage(e.target.value)} placeholder={user._id === activeRoom._id ? "Add a bookmark" : `Message ${activeRoom.fullname}`} className='no-resize align-top p-2 w-full h-full rounded absolute top-0 left-0 bg-slate-200 resize-none focus:outline-cr-purple flex items-start justify-start' />
                        <button onClick={() => sendMessage} disabled={message ? false : true} className={`${message ? "bg-cr-purple" : "bg-cr-purple/60"} flex items-center  rounded px-3 py-1 text-white font-bold absolute bottom-3 right-3 `}>
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