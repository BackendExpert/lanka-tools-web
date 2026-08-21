import React from 'react'
import { FaCheck, FaTools } from 'react-icons/fa'

const AboutUs = () => {
    return (
        <section className="bg-[#292929] px-8 py-20 text-white md:px-16 lg:py-28">
            <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

                <div className="relative flex justify-center lg:justify-start">
                    <div className="absolute -left-6 -top-6 h-72 w-72 border border-yellow-400/30" />

                    <div className="relative h-80 w-full max-w-md overflow-hidden bg-yellow-400">
                        <img
                            src="https://wallpapercave.com/wp/wp10819914.jpg"
                            alt="Professional tools"
                            className="h-full w-full object-cover grayscale"
                        />

                        <div className="absolute inset-0 bg-black/45" />

                        <div className="absolute bottom-0 left-0 p-8">
                            <FaTools className="mb-4 text-3xl text-yellow-400" />

                            <h3 className="text-2xl font-black">
                                Quality Tools.
                            </h3>

                            <p className="mt-1 font-semibold text-yellow-400">
                                Ready When You Are.
                            </p>
                        </div>
                    </div>

                    <div className="absolute -bottom-8 -right-4 bg-yellow-400 px-7 py-5 text-black">
                        <p className="text-3xl font-black">10+</p>
                        <p className="text-sm font-bold uppercase tracking-wide">
                            Years Experience
                        </p>
                    </div>
                </div>

                <div>
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                        About ToolRent
                    </p>

                    <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                        Tools You Need.
                        <span className="block text-yellow-400">
                            Jobs You Trust.
                        </span>
                    </h2>

                    <p className="mt-6 leading-8 text-white/60">
                        ToolRent makes it simple to access professional tools
                        and equipment without the cost of buying and storing
                        them. Whether you are working on a construction
                        project, home improvement, repair, or maintenance job,
                        we have the equipment you need.
                    </p>

                    <div className="mt-8 space-y-4">
                        {[
                            'Professional quality equipment',
                            'Flexible rental periods',
                            'Affordable rental prices',
                            'Convenient branch locations',
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-yellow-400 text-black">
                                    <FaCheck className="text-xs" />
                                </div>

                                <span className="font-medium text-white/80">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-9 bg-yellow-400 px-8 py-3 font-bold text-black transition duration-300 hover:bg-yellow-300">
                        Discover Our Tools
                    </button>
                </div>

            </div>
        </section>
    )
}

export default AboutUs