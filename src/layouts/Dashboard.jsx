import React, { useState } from 'react';
import DashSide from '../component/Dashboard/DashSide';
import { Outlet } from 'react-router-dom';
import DashNav from '../component/Dashboard/DashNav';
import DashFooter from '../component/Dashboard/Dashfooter';
import { MdOutlineClose } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import { useAuth } from '../context/AuthContext';
import { useLocation } from "react-router-dom";
import ScrollToTop from '../services/ScrollToTop';

const Dashboard = () => {
    const [openside, setOpenSide] = useState(false);
    const { auth } = useAuth()
    const toggleMenu = () => setOpenSide(prev => !prev);
    const location = useLocation()

    let userdashtext = ''

    if (auth.role === "admin") {
        userdashtext = "Admin"
    }
    else if (auth.role === "student") {
        userdashtext = "Student"
    }

    return (
        <>
            <ScrollToTop />
            <div className="h-screen w-screen flex overflow-hidden">

                <div className="flex-1 flex flex-col h-screen">

                    <header className="top-0 left-0 w-full bg-transparent z-20">
                        <DashNav />
                    </header>

                    <div id="dashboard-content" className="xl:ml-[15%] pb-4 flex-1 overflow-y-auto bg-[#f8f9fa]">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 ml-8">
                            <div className="space-y-1 sm:space-y-2">
                                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 capitalize break-words">
                                    {userdashtext} Dashboard
                                </h1>
                                <p className="text-xs sm:text-sm md:text-base text-gray-500 capitalize break-words">
                                    {location.pathname}
                                </p>
                            </div>

                        </div>
                        <div className='mt-6 md:ml-8 ml-4 mr-2'>
                            <Outlet />
                        </div>

                        <footer className="mt-6 ">
                            <DashFooter />
                        </footer>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Dashboard;
