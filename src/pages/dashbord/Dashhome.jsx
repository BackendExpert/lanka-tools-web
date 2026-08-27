import React, { useEffect, useState } from 'react'
import CountData from './dashcomponents/CountData'
import TimeCard from '../../component/others/TimeCard'
import { useAuth } from '../../context/AuthContext'
import AdminAudits from './dashcomponents/AdminAudits'
import MyAudits from './dashcomponents/MyAudits'
import CostChart from './dashcomponents/adminCharts/CostChart'
import UsersChart from './dashcomponents/adminCharts/UsersChart'
import ProductListDash from './dashcomponents/ProductListDash'
import API from '../../services/api'
import User from '../../assets/User.png'
import { Hand } from 'lucide-react'
import MyRentalChart from './dashcomponents/MyRentalChart'

const Dashhome = () => {
    const { auth } = useAuth()
    const token = localStorage.getItem('access_token')

    const [myprofile, setMyProfile] = useState()

    useEffect(() => {
        const fetchmyprofile = async () => {
            const res = await API.get('/profile/profile-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setMyProfile(res.data.result)
            }
        }

        if (token) fetchmyprofile()
    }, [token])

    return (
        <div>
            <div className="lg:flex">
                <div className="lg:w-2/3 w-full">

                    {
                        auth?.role === 'super_admin' ?
                            <div className=""></div>
                            :
                            <div className="flex items-center gap-5 bg-white p-4  mb-4 border border-gray-100">
                                <div className="shrink-0">
                                    <img
                                        src={myprofile?.profile_img ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profile_img}` : User}
                                        alt="Profile"
                                        className="h-32 w-32 rounded-full object-cover"
                                    />
                                </div>

                                <div>
                                    <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                                        Welcome back
                                        <Hand className="h-6 w-6" />
                                    </h1>

                                    <p className="mt-1 text-base font-medium text-gray-700">
                                        {auth?.user?.email}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Welcome to your dashboard. Manage your profile and account details from here.
                                    </p>
                                </div>
                            </div>
                    }


                    <div className="">
                        <CountData />
                    </div>
                    {
                        auth?.role === 'customer' ?
                            <div className="mt-4">
                                <MyRentalChart />
                            </div>
                            :
                            <div className="md:flex">
                                <div className="w-full">
                                    <CostChart />
                                </div>
                                <div className="md:ml-4 w-full">
                                    <UsersChart />
                                </div>
                            </div>
                    }

                </div>
                <div className="lg:w-1/3 w-full lg:ml-4 lg:mt-0 mt-4">
                    <div className="">
                        <TimeCard />
                    </div>
                    <div className="mt-4">
                        {
                            auth.role === 'super_admin' ?
                                <div className="">
                                    <AdminAudits />
                                </div>
                                :
                                <div className="">
                                    <MyAudits />
                                </div>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-4">

                <div className="">
                    <ProductListDash />
                </div>
            </div>
        </div>
    )
}

export default Dashhome