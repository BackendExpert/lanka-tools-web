import React, { useEffect, useState } from 'react'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'
import API from '../../../services/api'
import UserImg from '../../../assets/User.png'

const MyProfile = () => {
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

    const [updtemenu, setUpdatemenu] = useState('update_profile')

    const healdeMenuChage = (menu) => {
        setUpdatemenu(menu)
    }

    return (
        <div className="">
            <div className="">
                <div className="w-full bg-white md:p-8 p-4 rounded-lg shadow-md md:mr-2 mr-0">
                    <div className="flex items-center gap-5 p-5 border border-gray-200 bg-white">
                        <div className="w-20 h-20 shrink-0 overflow-hidden rounded-full border-2 border-gray-100">
                            <img
                                src={
                                    myprofile?.profile_img
                                        ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profile_img}`
                                        : UserImg
                                }
                                alt="profile-img"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-bold text-gray-900 truncate">
                                    {myprofile?.first_name} {myprofile?.last_name}
                                </h2>

                                <span className="px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-100">
                                    Active
                                </span>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                                {myprofile?.mobile && (
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">
                                            Mobile
                                        </span>
                                        <span>{myprofile.mobile}</span>
                                    </div>
                                )}

                                {myprofile?.dob && (
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">
                                            Date of Birth
                                        </span>
                                        <span>
                                            {new Date(myprofile.dob).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {myprofile?.bio && (
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 line-clamp-2">
                                    {myprofile.bio}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

                        <div className="border border-gray-200 bg-white p-5">
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-900">
                                    Residential Address
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Your current residential address
                                </p>
                            </div>

                            <div className="text-sm text-gray-600 leading-6">
                                {myprofile?.address ? (
                                    <>
                                        {myprofile.address.address_line_1 && (
                                            <div>{myprofile.address.address_line_1}</div>
                                        )}

                                        {myprofile.address.address_line_2 && (
                                            <div>{myprofile.address.address_line_2}</div>
                                        )}

                                        {(myprofile.address.city || myprofile.address.state) && (
                                            <div>
                                                {myprofile.address.city}
                                                {myprofile.address.city && myprofile.address.state
                                                    ? ", "
                                                    : ""}
                                                {myprofile.address.state}
                                            </div>
                                        )}

                                        {myprofile.address.postal_code && (
                                            <div>{myprofile.address.postal_code}</div>
                                        )}

                                        {myprofile.address.country && (
                                            <div>{myprofile.address.country}</div>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-gray-400">
                                        No residential address added
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="border border-gray-200 bg-white p-5">
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-900">
                                    Billing Address
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Address used for billing
                                </p>
                            </div>

                            <div className="text-sm text-gray-600 leading-6">
                                {myprofile?.billing_address ? (
                                    <>
                                        {myprofile.billing_address.address_line_1 && (
                                            <div>
                                                {myprofile.billing_address.address_line_1}
                                            </div>
                                        )}

                                        {myprofile.billing_address.address_line_2 && (
                                            <div>
                                                {myprofile.billing_address.address_line_2}
                                            </div>
                                        )}

                                        {(myprofile.billing_address.city ||
                                            myprofile.billing_address.state) && (
                                                <div>
                                                    {myprofile.billing_address.city}
                                                    {myprofile.billing_address.city &&
                                                        myprofile.billing_address.state
                                                        ? ", "
                                                        : ""}
                                                    {myprofile.billing_address.state}
                                                </div>
                                            )}

                                        {myprofile.billing_address.postal_code && (
                                            <div>
                                                {myprofile.billing_address.postal_code}
                                            </div>
                                        )}

                                        {myprofile.billing_address.country && (
                                            <div>
                                                {myprofile.billing_address.country}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-gray-400">
                                        No billing address added
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>


                </div>

                <div className="w-full mt-6 md:mt-4">

                    <div className="rounded-2xl shadow-sm">
                        <UpdateProfile profiledata={myprofile} token={token} />

                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-4">
                        <div className="mb-4 text-lg font-bold text-gray-500 border-b border-gray-200 pb-2">
                            Update Password
                        </div>
                        <UpdatePassword token={token} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile