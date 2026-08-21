import React, { useEffect, useRef, useState } from 'react'
import {
    FaGraduationCap,
    FaSearch,
    FaBell,
    FaChevronDown,
    FaUser,
    FaBookmark,
    FaCog,
    FaQuestionCircle,
    FaSignOutAlt
} from 'react-icons/fa'
import DefultProfleImg from '../../assets/User.png'
import { useAuth } from '../../context/AuthContext'
import API from '../../services/api'


const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef(null)
    const { auth } = useAuth()
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])


    const [profile, setProfile] = useState('')

    useEffect(() => {
        const fetechCurrntProfile = async () => {
            const res = await API.get('/profile/profile-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setProfile(res.data.result)
            }
        }
        if (token) fetechCurrntProfile()
    }, [token])


    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between max-w-screen-2xl mx-auto w-full px-6 py-4">

                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white">
                            <FaGraduationCap className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-lg font-bold text-gray-900">
                                ABC Research
                            </p>

                            <p className="text-xs text-gray-500">
                                Research Management
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center w-80 h-10 rounded-xl border border-gray-200 bg-gray-50 px-4">
                        <FaSearch className="text-gray-400 mr-3" />

                        <input
                            type="text"
                            placeholder="Search research..."
                            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <button
                        className="relative flex items-center justify-center h-10 w-10 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                    >
                        <FaBell className="h-5 w-5" />

                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
                    </button>

                    <div className="h-8 w-px bg-gray-200" />

                    <div
                        ref={profileRef}
                        className="relative"
                    >
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-gray-50 transition"
                        >
                            {
                                profile?.profle_img ?
                                    <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${profile.profle_img}`} alt="" className='h-11 w-11 rounded-full object-cover' />
                                    :
                                    <img src={DefultProfleImg} alt="" className='h-11 w-11 rounded-full object-cover' />

                            }


                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-semibold text-gray-800">
                                    {auth?.user?.email?.replace('@gmail.com', '')}
                                </p>

                                <p className="text-xs text-gray-500">
                                    View Profile
                                </p>
                            </div>

                            <FaChevronDown
                                className={`hidden sm:block text-xs text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 top-16 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">

                                <div className="px-3 py-3 border-b border-gray-100 mb-2 flex">
                                    {
                                        profile?.profle_img ?
                                            <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${profile.profle_img}`} alt="" className='rounded-full h-10 w-10' />
                                            :
                                            <img src={DefultProfleImg} alt="" className='h-10 w-10 rounded-full' />

                                    }

                                    <a href={`/${profile.first_name}${profile.last_name}`}>
                                        <div className="ml-2">
                                            <p className="text-sm font-semibold text-gray-900">
                                                Researcher
                                            </p>

                                            <p className="text-xs text-gray-500 mt-0">
                                                {auth?.user?.email}
                                            </p>
                                        </div>
                                    </a>

                                </div>

                                <a href="" className='border-b border-gray-100 '>
                                    <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                                        <FaBell className="text-gray-400" />
                                        Notification - Inbox (0)
                                    </button>
                                </a>
                                <div className="border-t border-gray-100 my-2" />

                                <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                                    <FaBookmark className="text-gray-400" />
                                    Saved Research
                                </button>

                                <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                                    <FaCog className="text-gray-400" />
                                    Settings
                                </button>

                                <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                                    <FaQuestionCircle className="text-gray-400" />
                                    Help & Support
                                </button>

                                <div className="border-t border-gray-100 my-2" />

                                <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar