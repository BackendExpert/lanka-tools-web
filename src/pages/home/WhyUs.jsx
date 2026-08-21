import React from 'react'
import { FaUser } from 'react-icons/fa'

const WhyUs = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[url('https://wallpapercave.com/wp/wp10819962.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/30 to-black/30" />

            <div className="relative max-w-7xl mx-auto px-4">

                <div className="text-center pt-16">
                    <h3 className="text-yellow-400 font-bold uppercase tracking-widest">
                        Why Choose Us
                    </h3>

                    <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
                        Heavy equipment solutions <br /> according to your needs
                    </h1>
                </div>

                <div className="grid xl:grid-cols-3 gap-4 my-16">


                    <div>

                        <div
                            className="bg-[#454342] p-8"
                            style={{
                                clipPath:
                                    "polygon(0 0, 45% 0, 50% 8%, 100% 8%, 100% 100%, 0 100%)"
                            }}
                        >
                            <div className="flex items-center justify-center text-center p-8 text-white">
                                <div className="flex flex-col items-center">

                                    <FaUser className="text-3xl text-yellow-400" />

                                    <div className="mt-5">
                                        <h2 className="text-2xl font-semibold">
                                            Expert Support
                                        </h2>

                                        <p className="mt-3 leading-7 text-gray-300">
                                            Get reliable guidance from our experienced
                                            team. We help you choose the right equipment
                                            and provide support throughout your rental.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-[#454342] p-8 mt-10"
                            style={{
                                clipPath:
                                    "polygon(0 0, 45% 0, 50% 8%, 100% 8%, 100% 100%, 0 100%)"
                            }}
                        >
                            <div className="flex items-center justify-center text-center p-8 text-white">
                                <div className="flex flex-col items-center">

                                    <FaUser className="text-3xl text-yellow-400" />

                                    <div className="mt-5">
                                        <h2 className="text-2xl font-semibold">
                                            Flexible Rentals
                                        </h2>

                                        <p className="mt-3 leading-7 text-gray-300">
                                            Choose rental periods that work for your
                                            project and manage your equipment needs
                                            without unnecessary commitments.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>


                    <div
                        className="relative bg-[#292929] bg-[url('https://wallpapercave.com/wp/wp15855227.jpg')] bg-cover bg-center"
                    >
                        <div className="absolute inset-0 bg-[#292929]/60" />

                        <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-8">

                            <FaUser className="text-5xl text-yellow-400" />

                            <h2 className="text-4xl font-bold mt-6">
                                Why Choose Us
                            </h2>

                            <p className="mt-5 leading-7 text-gray-300">
                                We provide dependable equipment, flexible rental
                                solutions, and professional support to help you
                                complete your projects with confidence.
                            </p>

                        </div>
                    </div>

          
                    <div>

                        <div
                            className="bg-[#454342] p-8"
                            style={{
                                clipPath:
                                    "polygon(0 0, 45% 0, 50% 8%, 100% 8%, 100% 100%, 0 100%)"
                            }}
                        >
                            <div className="flex items-center justify-center text-center p-8 text-white">
                                <div className="flex flex-col items-center">

                                    <FaUser className="text-3xl text-yellow-400" />

                                    <div className="mt-5">
                                        <h2 className="text-2xl font-semibold">
                                            Quality Equipment
                                        </h2>

                                        <p className="mt-3 leading-7 text-gray-300">
                                            Access well-maintained and dependable
                                            equipment selected for demanding
                                            construction and professional projects.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-[#454342] p-8 mt-10"
                            style={{
                                clipPath:
                                    "polygon(0 0, 45% 0, 50% 8%, 100% 8%, 100% 100%, 0 100%)"
                            }}
                        >
                            <div className="flex items-center justify-center text-center p-8 text-white">
                                <div className="flex flex-col items-center">

                                    <FaUser className="text-3xl text-yellow-400" />

                                    <div className="mt-5">
                                        <h2 className="text-2xl font-semibold">
                                            Trusted Service
                                        </h2>

                                        <p className="mt-3 leading-7 text-gray-300">
                                            From equipment selection to handover,
                                            we focus on providing a smooth,
                                            transparent, and dependable experience.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default WhyUs