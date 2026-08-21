import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Questions = () => {
    const [openQuestion, setOpenQuestion] = useState(null)

    const questions = [
        {
            id: 1,
            question: "What types of equipment can I rent?",
            answer: "We offer a wide range of construction and heavy equipment suitable for different projects, including machinery for building, excavation, lifting, and site preparation.",
        },
        {
            id: 2,
            question: "How long can I rent the equipment?",
            answer: "You can rent equipment for short-term or long-term periods depending on your project requirements. Flexible rental periods are available to suit your schedule.",
        },
        {
            id: 3,
            question: "Do I need to provide a deposit?",
            answer: "A security deposit may be required depending on the equipment, rental duration, and rental agreement. The required amount will be confirmed before your rental is approved.",
        },
        {
            id: 4,
            question: "Is the equipment maintained before rental?",
            answer: "Yes. All equipment is inspected and maintained before being handed over to customers to ensure it is ready for safe and reliable operation.",
        },
        {
            id: 5,
            question: "Can I extend my rental period?",
            answer: "Yes. Rental periods can usually be extended if the equipment has not already been reserved by another customer. Contact our team before your rental ends to request an extension.",
        },
        {
            id: 6,
            question: "Do you provide equipment delivery?",
            answer: "Equipment delivery can be arranged depending on the type of equipment, location, and availability. Delivery details and charges will be confirmed when making your rental request.",
        },
        {
            id: 7,
            question: "What happens if the equipment breaks down?",
            answer: "If equipment experiences a mechanical problem during normal use, contact our support team immediately. We will assess the issue and arrange the appropriate assistance or solution.",
        },
        {
            id: 8,
            question: "Can I rent equipment for a construction project?",
            answer: "Yes. Our equipment is suitable for a variety of construction, renovation, excavation, landscaping, and other professional projects.",
        },
        {
            id: 9,
            question: "What happens if I return the equipment late?",
            answer: "Late returns may result in additional rental charges or penalties depending on the rental agreement. Customers should contact us as early as possible if they expect a delay.",
        },
        {
            id: 10,
            question: "What should I do before returning the equipment?",
            answer: "Return the equipment on the agreed date and in the condition specified in your rental agreement. Make sure all included tools and accessories are returned with the equipment.",
        },
    ]

    return (
        <div className="bg-[#292929]">
            <div className="max-w-7xl mx-auto pt-80 md:pt-[22rem] lg:pt-40 pb-20 text-white">

                <div className="text-center">
                    <h3 className="uppercase text-xl text-yellow-500 font-bold tracking-[0.5rem]">
                        Common Questions
                    </h3>

                    <h1 className="text-5xl font-semibold mt-4">
                        Most Popular Questions
                    </h1>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

                        {
                            questions.map((data, index) => {
                                const isOpen = openQuestion === index

                                return (
                                    <div
                                        className="bg-[#454342] text-white self-start"
                                        key={data.id}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenQuestion(
                                                    isOpen ? null : index
                                                )
                                            }}
                                            className={`w-full flex items-center justify-between gap-6 p-6 text-left transition-colors duration-300 ${
                                                isOpen
                                                    ? 'bg-yellow-500 text-black'
                                                    : 'bg-[#454342] text-white'
                                            }`}
                                        >
                                            <h2 className="text-lg md:text-xl font-semibold">
                                                {data.question}
                                            </h2>

                                            <div
                                                className={`shrink-0 ${
                                                    isOpen
                                                        ? 'text-black'
                                                        : 'text-yellow-400'
                                                }`}
                                            >
                                                {isOpen ? (
                                                    <FaChevronUp className="text-sm" />
                                                ) : (
                                                    <FaChevronDown className="text-sm" />
                                                )}
                                            </div>
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                                isOpen
                                                    ? 'max-h-96 opacity-100'
                                                    : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="px-6 pb-6">
                                                <div className="h-px bg-gray-600 mb-5" />

                                                <p className="text-gray-300 leading-7">
                                                    {data.answer}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Questions