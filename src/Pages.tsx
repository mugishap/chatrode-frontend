import React, { Suspense, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CommonContext } from './context'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import Home from './pages/Home/Home'

const Pages = () => {

  const { theme } = useContext(CommonContext)

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
            <Route path='/chat' element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  )
}

export default Pages