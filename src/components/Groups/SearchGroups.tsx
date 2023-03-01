import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const SearchGroups = () => {

    const [query, setQuery] = useState("")

    const getGroups = async () => {

    }

    return (
        <div className='w-full bg-slate-300 h-12 my-4 rounded px-2 flex items-center'>
            <RiSearch2Line size={22} />
            <input type="text" className='pl-4 outline-none w-11/12 bg-inherit placeholder:text-slate-600' placeholder='Search groups...' />
        </div>
    )
}

export default SearchGroups