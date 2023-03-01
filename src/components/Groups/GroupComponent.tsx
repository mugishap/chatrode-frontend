import React from 'react'
import SearchGroups from './SearchGroups'

const GroupComponent = () => {
  return (
    <div className='w-full flex pt-8 flex-col'>
      <div className='w-full px-4 h-fit'>
        <span className='font-bold text-xl'>Groups</span>
        <SearchGroups />
      </div>
    </div>
  )
}

export default GroupComponent