import React, { useEffect, useState } from 'react'

const TimeCard = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const hour = time.getHours()

    const greeting =
        hour < 12
            ? 'Good Morning'
            : hour < 18
                ? 'Good Afternoon'
                : 'Good Evening'

    const formattedTime = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })

    const formattedDate = time.toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    return (
        <div className="bg-white border border-gray-200 px-5 py-6 flex items-center justify-between rounded-lg">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-indigo-50 flex items-center justify-center">
                    <span className="text-xl">🕒</span>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        {greeting}
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 leading-none mt-1">
                        {formattedTime}
                    </h2>
                </div>
            </div>


            <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-700">
                    {formattedDate}
                </p>

                <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                    <p className="text-xs text-gray-500">
                        System Online • Local Time
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TimeCard