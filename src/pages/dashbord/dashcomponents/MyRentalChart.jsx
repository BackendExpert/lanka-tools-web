import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import LineChart from '../../../component/Dashboard/Charts/LineChart'


const MyRentalChart = () => {
    const token = localStorage.getItem('access_token')
    const [rentaltools, setRentalTools] = useState([])

    useEffect(() => {
        const fetchmyretaltools = async () => {
            try {
                const res = await API.get('/rentel/my-rental-tools', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.data.success === true) {
                    setRentalTools(res.data.result.filter(item => item.is_returned === false))
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (token) fetchmyretaltools()
    }, [token])

    const now = new Date()

    const months = Array.from({ length: 3 }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (2 - index), 1)

        return {
            name: date.toLocaleString('default', { month: 'short' }),
            year: date.getFullYear(),
            month: date.getMonth()
        }
    })

    const chartData = months.map(item => {
        const count = rentaltools.filter(rental => {
            const rentalDate = new Date(rental.createdAt || rental.created_at)

            return (
                rentalDate.getFullYear() === item.year &&
                rentalDate.getMonth() === item.month
            )
        }).length

        return {
            name: item.name,
            rentals: count
        }
    })

    return (
        <div className="bg-white border border-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                My Rentals
            </h2>

            <LineChart
                data={chartData}
                xKey="name"
                lines={[
                    {
                        dataKey: 'rentals',
                        name: 'Rentals',
                        color: '#eab308'
                    }
                ]}
                height={300}
            />
        </div>
    )
}

export default MyRentalChart