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
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    const day = time.toLocaleDateString([], {
        weekday: 'short',
    })

    const date = time.getDate()

    return (
        <div className="relative overflow-hidden bg-black text-white ">
            <div className="absolute -right-20 -top-20 h-52 w-52 bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-48 w-48 bg-yellow-400/5 blur-3xl" />

            <div className="relative flex flex-col gap-6 px-6 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center bg-yellow-400 text-black">
                        <span className="text-2xl">◷</span>
                        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-black" />
                    </div>

                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-yellow-400" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                                {greeting}
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {formattedTime}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Your local time
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-5 border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <div className="flex h-14 w-14 flex-col items-center justify-center border border-white/10">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-400">
                            {day}
                        </span>
                        <span className="text-xl font-bold">
                            {date}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-white">
                            {formattedDate}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping bg-yellow-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 bg-yellow-400" />
                            </span>

                            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                                System Online
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative h-1 w-full bg-white/5">
                <div className="h-full w-1/3 bg-yellow-400" />
            </div>
        </div>
    )
}

export default TimeCard