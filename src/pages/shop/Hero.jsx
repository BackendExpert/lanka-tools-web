import React from 'react'

const Hero = () => {
    return (
        <section className="relative h-[45vh] w-full overflow-hidden bg-[url('https://wallpapercave.com/wp/wp10819914.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            <div className="relative z-10 flex h-full items-center justify-center">
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                    <span className="text-yellow-400">Shop</span>
                </h1>
            </div>
        </section>
    )
}

export default Hero