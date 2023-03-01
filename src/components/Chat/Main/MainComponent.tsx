import React, { useContext } from 'react'
import { RiMessageLine } from 'react-icons/ri'
import { CommonContext } from '../../../context'

const MainComponent = () => {

  const { theme } = useContext(CommonContext)

  return (
    <div style={{ backgroundColor: `${theme.backgroundColor}`, color: `${theme.textColor}` }} className={`w-9/12 shadow-lg shadow-slate-300 h-full flex items-center justify-center`} >
      <div className=' flex flex-col items-center'>
        <div className=' w-36 h-36 mb-4 rounded-full bg-slate-300 flex items-center justify-center'>
          <RiMessageLine size={85} className="" />
        </div>
        <span className='text-xl font-bold'>Select a message from the right</span>
      </div>
    </div >
  )
}

export default MainComponent