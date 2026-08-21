import React from 'react'
import {
    FaTools,
    FaHardHat,
    FaTruck,
    FaBolt,
    FaWrench,
    FaIndustry,
    FaBuilding
} from 'react-icons/fa'

const Partners = () => {
    const data = [
        {
            id: 1,
            name: 'BuildPro',
            icon: FaHardHat,
        },
        {
            id: 2,
            name: 'ToolMaster',
            icon: FaTools,
        },
        {
            id: 3,
            name: 'PowerMax',
            icon: FaBolt,
        },
        {
            id: 4,
            name: 'FixRight',
            icon: FaWrench,
        },
        {
            id: 5,
            name: 'Constructa',
            icon: FaBuilding,
        },
        {
            id: 6,
            name: 'HeavyWorks',
            icon: FaIndustry,
        },
        {
            id: 7,
            name: 'RapidRent',
            icon: FaTruck,
        },
    ]

    return (
        <section className="bg-[#292929] px-8 py-20 text-white md:px-16">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                        Trusted Partners
                    </p>

                    <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
                        Trusted By The
                        <span className="text-yellow-400"> Industry</span>
                    </h2>

                    <p className="mt-5 leading-7 text-white/50">
                        We work with trusted businesses and equipment
                        providers to give you access to reliable tools
                        whenever you need them.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 lg:grid-cols-7">
                    {data.map((partner) => {
                        const Icon = partner.icon

                        return (
                            <div
                                key={partner.id}
                                className="group flex h-40 flex-col items-center justify-center gap-4 border-b border-r border-white/10 bg-white/[0.02] transition-all duration-300 hover:bg-yellow-400"
                            >
                                <Icon
                                    className="text-3xl text-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:text-black"
                                />

                                <span className="text-sm font-bold tracking-wide text-white/60 transition-colors duration-300 group-hover:text-black">
                                    {partner.name}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
                    <p className="text-sm text-white/40">
                        Quality equipment from trusted industry partners.
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold text-yellow-400">
                        <FaTools />
                        <span>Professional Equipment</span>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Partners