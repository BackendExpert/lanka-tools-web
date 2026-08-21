import React from 'react'
import Hero from './Hero'
import AboutUs from './AboutUs'
import Partners from './Partners'
import WhyUs from './WhyUs'
import DataStats from './DataStats'
import Questions from './Questions'

const HomePage = () => {
    return (
        <div className="">
            <div>
                <Hero />
            </div>
            <div>
                <AboutUs />
            </div>
            <div className="">
                <WhyUs />
            </div>
            <div className="">
                <Partners />
            </div>
            <div className="">
                <DataStats />
            </div>
            <div className="">
                <Questions />
            </div>
        </div>
    )
}

export default HomePage