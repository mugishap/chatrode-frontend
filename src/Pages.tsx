import React, { Suspense, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './admin/Dashboard/Dashboard'
import Settings from './admin/Settings/Settings'
import Users from './admin/Users/Users'
import { CommonContext } from './context'
import PageNotfound from './pages/404/PageNotfound'
import InternalServerError from './pages/500/InternalServerError'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'
import PasswordResetSuccess from './pages/Auth/ForgotPassword/PasswordResetSuccess'
import ResetPassword from './pages/Auth/ForgotPassword/ResetPassword'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import VerifyAccount from './pages/Auth/Verification/VerifyAccount'
import Home from './pages/Home/Home'
import Terms from './pages/Terms/Terms'
import { User } from './types'

const Pages = () => {

  const { theme } = useContext(CommonContext)
  const userSlice = useSelector((state: any) => state.user);
  const user: User = userSlice.user;

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
            <Route path='/auth/register' element={<Signup />}></Route>
            <Route path='/auth/login' element={<Login />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/auth/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/auth/reset-password/:passwordResetToken' element={<ResetPassword />}></Route>
            <Route path='/auth/reset-password/sucess' element={<PasswordResetSuccess />}></Route>
            <Route path='/auth/verify-email/:verificationToken' element={<VerifyAccount />}></Route>
            <Route path='/error' element={<InternalServerError />}></Route>
            <Route path='/terms' element={<Terms />}></Route>
            {userSlice.isLoggedIn && user.role == "admin" && (
              <>
                <Route path='/admin/dashboard' element={<Dashboard />}></Route>
                <Route path='/admin/settings' element={<Settings />}></Route>
                <Route path='/admin/users' element={<Users />}></Route>
              </>)}
            <Route path='*' element={<PageNotfound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  )
}

export default Pages