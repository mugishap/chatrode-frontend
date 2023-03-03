import { useState } from 'react'
import './App.css'
import Pages from './Pages'
import { CommonContext } from './context'
import { User } from './types'
import theme, { MuiTheme } from './theme/theme'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import DeleteAccountModal from './components/Modals/DeleteAccountModal'
import { ThemeProvider } from '@mui/material/styles'
import { socket } from './context'
import { useDispatch, useSelector } from 'react-redux'

function App() {

  const users = useSelector((state: any) => state.user.users)
  const user = useSelector((state: any) => state.user.user)
  const me = useSelector((state: any) => state.user.user)
  const token = useSelector((state: any) => state.user.token)
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
  const verification = useSelector((state: any) => state.user.verification)
  const [activeRoom, setActiveRoom] = useState(null);
  const [members, setMembers] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [deleteModal, setDeleteModal] = useState(false)
  const onlineUsers: User[] = useSelector((state: any) => state.user.onlineUsers);
  const dispatch = useDispatch()

  return (
    <CommonContext.Provider
      value={{
        users,
        user,
        verification,
        me,
        isLoggedIn,
        token,
        activeRoom,
        setActiveRoom,
        members,
        setMembers,
        messages,
        setMessages,
        currentTheme,
        setDeleteModal,
        deleteModal,
        setCurrentTheme,
        theme: theme[currentTheme],
        socket,
        onlineUsers,
        dispatch
      }}
    >
      <div className="font-lato min-h-screen w-screen flex flex-col">
        {deleteModal && <DeleteAccountModal viewDeleteModal={deleteModal} setViewDeleteModal={setDeleteModal} theme={theme[currentTheme]} />}
        <ToastContainer theme='colored' position='top-center' hideProgressBar={true} />
        <ThemeProvider theme={MuiTheme}>
          <Pages />
        </ThemeProvider>
      </div>
    </CommonContext.Provider>
  )
}

export default App
