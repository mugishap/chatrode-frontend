import React, { Component, ReactElement, useContext } from 'react'
import { CommonContext } from '../../context'
import { FormInput } from '../../types'

interface Props extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> {
    input: FormInput
}

const Input: React.FC<Props> = ({ input }): ReactElement => {
    const Icon = input.icon
    const {theme} = useContext(CommonContext)
    return (
        <div className='w-full flex my-2 flex-col items-start justify-center'>
            <span className={`my-1`}>{input.label}</span>
            <div style={{backgroundColor:`${theme.addons}`}} className='border border-slate-300 w-full rounded-l rounded flex'>
                <div  className={`w-10 rounded-l h-10 flex border items-center justify-center bg-addon text-slate-600 border-r border-r-slate-300`}>
                    <Icon />
                </div>
                <input type={input.type} className={`w-11/12 bg-light-input-bg placeholder:text-gray-400 placeholder:text-sm outline-none rounded-r px-3 h-10`} placeholder={input.placeholder} />
            </div>
        </div>
    )
}

export default Input