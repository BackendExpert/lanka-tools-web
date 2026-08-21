import React from 'react'
import DefaultButton from '../../component/Buttons/DefaultButton'
import SecButton from '../../component/Buttons/SecButton'

import Constraction1 from '../../assets/Constraction1.png'
import Constraction2 from '../../assets/Constraction2.png'
import Constraction3 from '../../assets/Constraction3.png'


const Hero = () => {
    return (
        <section className="relative md:h-[calc(100vh-80px)] h-screen w-full overflow-hidden md:bg-[url('https://wallpapercave.com/wp/wp10819914.jpg')] bg-[url(https://wallpapercave.com/wp/wp10819893.jpg)] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/55 to-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/55 to-black/55" />

            <div className="relative z-10 flex h-full items-center">
                <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">


                        <div className="max-w-3xl">
                            <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                                Professional Tools • Easy Rental
                            </p>

                            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                                The Right Tools
                                <span className="block text-yellow-400">
                                    For Every Job
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                                Rent professional tools and equipment when you need
                                them. Quality equipment, flexible rental periods,
                                and everything you need to get the job done.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <DefaultButton label="Browse Tools" />
                                <SecButton label="Rent Now" />
                            </div>
                        </div>


                        <div className="hidden lg:flex items-center justify-center">
                            <div className="w-full max-w-xl">


                                <div className="flex justify-center">
                                    <img
                                        src={Constraction1}
                                        alt="Construction vehicle"
                                        className="w-72 xl:w-80 object-contain drop-shadow-2xl"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2 -mt-6">

                                    <div className="flex items-end justify-center">
                                        <img
                                            src={Constraction2}
                                            alt="Construction vehicle"
                                            className="w-full max-w-[280px] object-contain drop-shadow-2xl"
                                        />
                                    </div>

                                    <div className="flex items-end justify-center">
                                        <img
                                            src={Constraction3}
                                            alt="Construction vehicle"
                                            className="w-full max-w-[280px] object-contain drop-shadow-2xl"
                                        />
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

export default Hero