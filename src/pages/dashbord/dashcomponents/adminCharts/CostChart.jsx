import React, { useEffect, useState } from 'react'
import AreaChart from '../../../../component/Dashboard/Charts/AreaChart'
import API from '../../../../services/api'

const CostChart = () => {
    const token = localStorage.getItem('access_token')
    const [cost, setCost] = useState([])

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const res = await API.get('/rentel/rented-list', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    const rentals = res.data.result || []

                    const months = []

                    for (let i = 3; i >= 0; i--) {
                        const date = new Date()
                        date.setMonth(date.getMonth() - i)

                        months.push({
                            month: date.toLocaleString('en-US', {
                                month: 'short',
                            }),
                            monthNumber: date.getMonth(),
                            year: date.getFullYear(),
                            income: 0,
                        })
                    }

                    rentals.forEach((rental) => {
                        const rentalDate = new Date(
                            rental.createdAt || rental.rented_at
                        )

                        const month = months.find(
                            (item) =>
                                item.monthNumber === rentalDate.getMonth() &&
                                item.year === rentalDate.getFullYear()
                        )

                        if (month) {
                            month.income += Number(
                                rental.total_amount ||
                                rental.totalAmount ||
                                rental.amount ||
                                0
                            )
                        }
                    })

                    setCost(months)
                }
            } catch (error) {
                console.error('Rentals:', error)
            }
        }

        fetchRentals()
    }, [token])

    return (
        <div className='bg-white p-4  mt-4 border border-gray-100'>
            <h1 className="text-xl font-bold pb-8">Income</h1>
            <AreaChart
                data={cost}
                xKey='month'
                areas={[
                    {
                        dataKey: 'income',
                        name: 'Income',
                        color: '#eab308',
                        opacity: 0.25,
                        strokeWidth: 2,
                    },
                ]}
            />
        </div>
    )
}

export default CostChart