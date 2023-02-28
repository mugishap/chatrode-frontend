import React, { useEffect } from 'react'
import { RiArrowLeftFill } from 'react-icons/ri'

const Terms = () => {


    useEffect(() => {
        document.title = "Terms and Conditions | ChatRode"
    }, [])

    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <button title='Go Back' onClick={() => {
                window.history.back()
            }} className='absolute left-6 top-6 bg-cr-purple p-2 rounded-full text-white'>
                <RiArrowLeftFill className='' size={25} />
            </button>
            <div className='w-8/12 rounded p-8 bg-white h-4/5 flex flex-col'>
                <div>
                    <h1 className='font-bold text-cr-purple  text-2xl mt-4'>Chat Rode - Terms and Conditions</h1>
                    <p>Welcome to Chat Rode, a chat application that allows you to communicate with other users in real-time. By using Chat Rode, you agree to be bound by the following terms and conditions:</p>

                    <h2 className='font-bold text-cr-purple  text-lg mt-4'>1. Acceptance of Terms</h2>
                    <p>By using Chat Rode, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions, as well as our Privacy Policy. If you do not agree to these terms and conditions or our Privacy Policy, please do not use Chat Rode.</p>

                    <h2 className='font-bold text-cr-purple  text-lg mt-4'>2. Use of Chat Rode</h2>
                    <p>You agree to use Chat Rode solely for lawful purposes and in a manner consistent with all applicable laws and regulations. You will not use Chat Rode to:</p>
                    <ul>
                        <li>Harass, bully, or intimidate other users;</li>
                        <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable;</li>
                        <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
                        <li>Post or transmit any content that infringes the intellectual property rights or other proprietary rights of any third party;</li>
                        <li>Engage in any activity that interferes with or disrupts Chat Rode or the servers and networks connected to Chat Rode.</li>
                    </ul>

                    <h2 className='font-bold text-cr-purple  text-lg mt-4'>3. User Content</h2>
                    <p>You retain all ownership rights to the content that you post or transmit through Chat Rode. However, by posting or transmitting any content through Chat Rode, you grant Chat Rode a non-exclusive, worldwide, royalty-free, perpetual, and irrevocable license to use, copy, reproduce, distribute, display, and modify the content in any form or media for the purposes of providing Chat Rode services.</p>
                    <p>You are solely responsible for the content that you post or transmit through Chat Rode. You represent and warrant that you have all necessary rights to post or transmit the content and that the content does not violate any law or infringe any third-party rights.</p>

                    <h2 className='font-bold text-cr-purple  text-lg mt-4'>4. User Conduct</h2>
                    <p>You agree to conduct yourself in a respectful and lawful manner while using Chat Rode. You will not use Chat Rode to:</p>
                    <ul>
                        <li>Collect, store, or disclose any personal information about other users;</li>
                        <li>Circumvent or attempt to circumvent any security measures or access any unauthorized areas of Chat Rode;</li>
                        <li>Use any automated means to access Chat Rode or collect information from Chat Rode;</li>
                        <li>Engage in any activity that could damage, disable, or impair Chat Rode or the servers and networks connected to Chat Rode.</li>
                    </ul>

                    <h2 className='font-bold text-cr-purple  text-lg mt-4'>5. Termination</h2>
                    <p>We reserve the right to terminate your access to Chat Rode at any time, with or without cause, and without prior notice. We may also delete any content or information that you have posted or</p>
                </div>
            </div>
        </div>
    )
}

export default Terms