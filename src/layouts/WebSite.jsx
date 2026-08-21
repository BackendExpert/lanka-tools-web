import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../component/Nav/Nav'
import Footer from '../component/Nav/Footer'
import ChatBot from '../component/chatbot/ChatBot'

const WebSite = () => {
    const location = useLocation();
    return (
        <div className="relative">
            <div className="">
                <Nav />
            </div>
            <div className=''>
                <Outlet />
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default WebSite
