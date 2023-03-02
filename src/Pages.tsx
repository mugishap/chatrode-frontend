import { Suspense, useContext } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Users from './pages/Admin/Users/Users'
import { CommonContext } from './context'
import PageNotfound from './pages/404/PageNotfound'
import InternalServerError from './pages/500/InternalServerError'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'
import ForgotPasswordPending from './pages/Auth/ForgotPassword/ForgotPasswordPending'
import PasswordResetSuccess from './pages/Auth/ForgotPassword/PasswordResetSuccess'
import ResetPassword from './pages/Auth/ForgotPassword/ResetPassword'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import VerifyAccount from './pages/Auth/Verification/VerifyAccount'
import Chat from './pages/Chat/Chat'
import Home from './pages/Chat/Chat'
import Contacts from './pages/Contacts/Contacts'
import Groups from './pages/Groups/Groups'
import Profile from './pages/Profile/Profile'
import Terms from './pages/Terms/Terms'
import Dashboard from './pages/Admin/Dashboard'
import UserPage from './pages/Admin/Users/UserPage'
import { User } from './types'
import Settings from './pages/Settings/Settings'
import Messages from './pages/Admin/Messages/Messages'
import Rooms from './pages/Admin/Rooms/Rooms'

const Pages = () => {

  const { theme } = useContext(CommonContext)
  const userSlice = useSelector((state: any) => state.user);
  const user: User = userSlice.user;
  const token: string = userSlice.token;

  return (
    <Suspense
      fallback={
        <div className='w-screen bg-cr-dark-bg h-screen flex justify-center items-center'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-cr-purple'></div>
        </div>
      }
    >
      <div style={{ backgroundColor: `${theme.backgroundColor}`, color: `${theme.textColor}` }} className={`w-screen min-h-screen flex flex-col`}>
        <BrowserRouter>
          <Routes>
            {
              (userSlice.isLoggedIn && token) &&
              (<>
                <Route path='/' element={<Home />}></Route>
                <Route path='/chat' element={<Chat />}></Route>
                <Route path='/groups' element={<Groups />}></Route>
                <Route path='/contacts' element={<Contacts />}></Route>
                <Route path='/settings' element={<Settings />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
              </>)
            }
            <Route path='/auth/register' element={token ? <Navigate to={"/profile"} /> : <Signup />}></Route>
            <Route path='/auth/login' element={token ? <Navigate to={"/profile"} /> : <Login />}></Route>
            <Route path='/auth/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/auth/reset-password/:passwordResetToken' element={<ResetPassword />}></Route>
            <Route path='/auth/reset-password/success' element={<PasswordResetSuccess />}></Route>
            <Route path='/auth/forgot-password-pending' element={<ForgotPasswordPending />}></Route>
            <Route path='/auth/verify-email/:verificationToken' element={token ? <VerifyAccount /> : <Navigate to={"/auth/login"} />}></Route>
            <Route path='/error' element={<InternalServerError />}></Route>
            <Route path='/terms' element={<Terms />}></Route>
            {userSlice.isLoggedIn && user.role == "ADMIN" && (
              <>
                <Route path='/admin' element={<Dashboard />}></Route>
                <Route path='/admin/users' element={<Users />}></Route>
                <Route path='/admin/user/:userId' element={<UserPage />}></Route>
                <Route path='/admin/messages' element={<Messages />}></Route>
                <Route path='/admin/rooms' element={<Rooms />}></Route>
              </>)}
            <Route path='*' element={<PageNotfound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  )
}

export default Pages