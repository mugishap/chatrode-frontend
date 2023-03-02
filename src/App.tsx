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


function App() {
  const [users, setUsers] = useState<User[]>([])
  const [rooms, setRooms] = useState<[]>([]);
  const [currentRoom, setCurrentRoom] = useState();
  const [members, setMembers] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [deleteModal, setDeleteModal] = useState(false)

  return (
    <CommonContext.Provider
      value={{
        users,
        setUsers,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        fullScreen,
        setFullScreen,
        currentTheme,
        setDeleteModal,
        deleteModal,
        setCurrentTheme,
        theme: theme[currentTheme],

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
