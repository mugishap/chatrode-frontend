import React from 'react'
import { Link } from 'react-router-dom'

const InternalServerError = () => {
    document.title = "500 | ChatRode"
    return (
        <div className="w-full">
            <main className="w-full     flex items-center justify-center flex-col pt-12 pb-16">
                <section className="relative flex flex-col">
                    <div className="text-[#263048] text-[200px] font-bold z-50 px-6">
                        500
                    </div>
                    <div className="absolute bg-cr-purple bottom-12 h-[30%] w-full"></div>
                </section>
                <section className="flex flex-col items-center space-y-3 pb-8">
                    <h2 className="text-[#2A2C30] font-bold text-2xl">Internal Server Error </h2>
                    <p className="text-gray-primary text-center max-w-md text-[18px]">We are really sorry. Our engineers are working on it, feel free to be going on with other actions.</p>
                </section>
                <Link to="/">
                    <button className="text-white bg-cr-purple rounded py-3 px-8 text-lg">
                        Back To Home Page
                    </button>
                </Link>
            </main>
        </div>
    )
}

export default InternalServerError