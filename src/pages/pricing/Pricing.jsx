import React from 'react'
import {
    FaClock,
    FaShieldAlt,
    FaTruck,
    FaTools,
    FaCheck
} from 'react-icons/fa'

const Pricing = () => {
    const plan = [
        {
            id: 1,
            name: 'Power Drill',
            category: 'Power Tools',
            price: 1200,
            period: 'day',
            icon: FaTools,
            popular: false,
            features: [
                'High-performance motor',
                'Variable speed control',
                'Drill bits included',
                'Safety case included',
            ],
        },
        {
            id: 2,
            name: 'Angle Grinder',
            category: 'Power Tools',
            price: 1500,
            period: 'day',
            icon: FaTools,
            popular: true,
            features: [
                'Heavy-duty construction',
                'Adjustable guard',
                'Grinding disc included',
                'Safety equipment included',
            ],
        },
        {
            id: 3,
            name: 'Electric Saw',
            category: 'Cutting Tools',
            price: 1800,
            period: 'day',
            icon: FaTools,
            popular: false,
            features: [
                'High-speed cutting',
                'Precision blade',
                'Blade included',
                'Protective case included',
            ],
        },
        {
            id: 4,
            name: 'Pressure Washer',
            category: 'Cleaning Equipment',
            price: 2500,
            period: 'day',
            icon: FaTools,
            popular: false,
            features: [
                'High-pressure cleaning',
                'Adjustable nozzle',
                'Long water hose',
                'Easy transport design',
            ],
        },
        {
            id: 5,
            name: 'Concrete Mixer',
            category: 'Construction',
            price: 4500,
            period: 'day',
            icon: FaTools,
            popular: true,
            features: [
                'Large mixing capacity',
                'Heavy-duty motor',
                'Easy loading system',
                'On-site delivery available',
            ],
        },
        {
            id: 6,
            name: 'Generator',
            category: 'Power Equipment',
            price: 5500,
            period: 'day',
            icon: FaTools,
            popular: false,
            features: [
                'Reliable power output',
                'Fuel efficient engine',
                'Low-noise operation',
                'Emergency support available',
            ],
        },
        {
            id: 7,
            name: 'Ladder Set',
            category: 'Access Equipment',
            price: 1000,
            period: 'day',
            icon: FaTools,
            popular: false,
            features: [
                'Heavy-duty aluminium',
                'Multiple height settings',
                'Anti-slip steps',
                'Safety inspection included',
            ],
        },
        {
            id: 8,
            name: 'Welding Machine',
            category: 'Workshop Equipment',
            price: 3000,
            period: 'day',
            icon: FaTools,
            popular: true,
            features: [
                'Stable welding output',
                'Adjustable current',
                'Welding cables included',
                'Safety equipment available',
            ],
        },
    ]

    return (
        <section className="bg-black px-6 py-20 text-white md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                        Rental Pricing
                    </p>

                    <h2 className="text-4xl font-black sm:text-5xl">
                        Professional Tools.
                        <span className="block text-yellow-400">
                            Simple Pricing.
                        </span>
                    </h2>

                    <p className="mt-5 leading-7 text-white/50">
                        Choose the equipment you need and rent it for as long
                        as your project requires.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {plan.map((item) => {
                        const Icon = item.icon

                        return (
                            <div
                                key={item.id}
                                className={`group relative border p-7 transition-all duration-300 hover:-translate-y-2 ${item.popular
                                        ? 'border-yellow-400 bg-yellow-400/[0.04]'
                                        : 'border-white/10 bg-white/[0.02] hover:border-yellow-400/50'
                                    }`}
                            >
                                {item.popular && (
                                    <div className="absolute right-0 top-0 bg-yellow-400 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black">
                                        Popular
                                    </div>
                                )}

                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                                            {item.category}
                                        </span>

                                        <h3 className="mt-3 text-2xl font-black">
                                            {item.name}
                                        </h3>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center bg-yellow-400 text-black">
                                        <Icon className="text-lg" />
                                    </div>
                                </div>

                                <div className="mt-7 flex items-end gap-2">
                                    <span className="text-4xl font-black">
                                        Rs. {item.price.toLocaleString()}
                                    </span>

                                    <span className="mb-1 text-sm text-white/40">
                                        / {item.period}
                                    </span>
                                </div>

                                <div className="my-7 border-t border-white/10" />

                                <div className="space-y-4">
                                    {item.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 text-sm text-white/60"
                                        >
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-yellow-400/10 text-yellow-400">
                                                <FaCheck className="text-[9px]" />
                                            </span>

                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-6">
                                    <div className="text-center">
                                        <FaClock className="mx-auto mb-2 text-yellow-400" />
                                        <span className="text-[10px] uppercase text-white/40">
                                            Flexible
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <FaShieldAlt className="mx-auto mb-2 text-yellow-400" />
                                        <span className="text-[10px] uppercase text-white/40">
                                            Inspected
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <FaTruck className="mx-auto mb-2 text-yellow-400" />
                                        <span className="text-[10px] uppercase text-white/40">
                                            Delivery
                                        </span>
                                    </div>
                                </div>

                                <button className="mt-7 w-full bg-yellow-400 px-6 py-3 font-bold text-black transition duration-300 hover:bg-yellow-300">
                                    Rent This Tool
                                </button>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default Pricing