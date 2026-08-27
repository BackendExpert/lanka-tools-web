import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import PieChart from '../../../../component/Dashboard/Charts/PieChart'

const UsersChart = () => {
    const token = localStorage.getItem('access_token')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get('/admin/fetch-users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setUsers(res.data.result || [])
                }
            } catch (error) {
                console.error('Users:', error)
            }
        }

        if (token) {
            fetchUsers()
        }
    }, [token])

    const chartData = [
        {
            name: 'Super Admin',
            value: users.filter((user) => user?.role?.role === 'super_admin').length,
            color: '#EAB308',
        },
        {
            name: 'Branch Manager',
            value: users.filter((user) => user?.role?.role === 'branch_manager').length,
            color: '#FACC15',
        },
        {
            name: 'Staff',
            value: users.filter((user) => user?.role?.role === 'staff').length,
            color: '#FDE047',
        },
        {
            name: 'Customer',
            value: users.filter((user) => user?.role?.role === 'customer').length,
            color: '#FEF08A',
        },
    ]

    return (
        <div className='bg-white p-4 border border-gray-100 mt-4'>
            <h1 className="text-xl font-bold">Users</h1>
            <PieChart
                data={chartData}
                dataKey="value"
                nameKey="name"
                colors={chartData.map((item) => item.color)}
            />
        </div>
    )
}

export default UsersChart