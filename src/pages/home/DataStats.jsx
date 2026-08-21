import React from 'react'
import DefaultButton from '../../component/Buttons/DefaultButton'
import { FaUser } from 'react-icons/fa'

const DataStats = () => {
    const countdata = [
        {
            id: 1,
            name: "Happy Client",
            countdata: 2800,
        },
        {
            id: 2,
            name: "Project Done",
            countdata: 128,
        },
        {
            id: 3,
            name: "Client Reviews",
            countdata: 4.9,
        },
        {
            id: 4,
            name: "Years Experience",
            countdata: 30,
        },
    ]
    return (
        <div className="relative xl:min-h-[70vh] w-full bg-[url(https://wallpapercave.com/wp/wp8671964.jpg)] bg-cover bg-center">

            {/* <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/30 to-black/30" /> */}

            <div className="max-w-7xl mx-auto relative">
                <div className="md:flex justify-between py-24">

                    <div className="xl:w-1/2">
                        <div className="bg-black/70 p-8 text-white md:mx-24 mx-4">
                            <h1 className="md:text-5xl text-3xl font-bold">
                                Whenever you need us, we’re here for you.
                            </h1>

                            <p className="mt-8">
                                Consectetuer pretium sem imperdiet fusce sed
                                parturient montes sodales adipiscing accumsan
                                magnis risus elit congue etiam feugiat class
                                vivamus iaculis
                            </p>

                            <div className="mt-8">
                                <a href="">
                                    <DefaultButton
                                        label="Get Started"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                    </div>

                </div>
            </div>
            <div className="absolute left-0 right-0 lg:-bottom-16 -bottom-50 z-[999]">
                <div className="max-w-7xl mx-auto">
                    <div className="md:mx-24 mx-4 bg-yellow-400">
                        <div className="grid grid-cols-2 lg:grid-cols-4">

                            {
                                countdata.map((data, index) => {
                                    return (
                                        <div
                                            className={`
                                    flex flex-col items-center justify-center
                                    text-center
                                    p-5 sm:p-6 md:p-8
                                    min-h-[120px] sm:min-h-[140px] md:min-h-[150px]
                                    border-gray-600

                                    ${index % 2 !== 0 ? 'border-l' : ''}
                                    ${index >= 2 ? 'border-t' : ''}

                                    lg:border-t-0
                                    lg:border-l
                                    ${index === 0 ? 'lg:border-l-0' : ''}
                                `}
                                            key={index}
                                        >
                                            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-none">
                                                {data.countdata}
                                                <span className="ml-1">+</span>
                                            </h1>

                                            <p className="pt-3 md:pt-4 text-sm sm:text-base md:text-base lg:text-lg font-semibold leading-tight">
                                                {data.name}
                                            </p>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DataStats