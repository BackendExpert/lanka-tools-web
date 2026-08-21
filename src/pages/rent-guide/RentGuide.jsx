import React from 'react'
import {
    FaCalendarAlt,
    FaIdCard,
    FaMoneyBillWave,
    FaTools,
    FaShieldAlt,
    FaClock,
    FaExclamationTriangle,
    FaClipboardCheck,
    FaTruck,
    FaPhoneAlt
} from 'react-icons/fa'

const RentGuide = () => {
    const topics = [
        {
            id: 1,
            title: 'Before You Rent',
            icon: FaClipboardCheck,
            content: [
                'Choose the correct tool for your project and make sure you understand its intended use.',
                'Check the tool specifications, required accessories, power requirements, and operating limitations.',
                'Make sure you have a valid identification document and the required rental payment or deposit.',
                'Inspect the equipment condition before accepting it and report any existing damage immediately.',
            ],
        },
        {
            id: 2,
            title: 'Booking & Reservation',
            icon: FaCalendarAlt,
            content: [
                'Select your preferred tool, rental period, pickup location, and required quantity.',
                'Review the rental dates carefully before confirming your booking.',
                'Your rental period begins from the confirmed pickup or delivery time.',
                'Keep your booking confirmation until the tool has been successfully returned.',
            ],
        },
        {
            id: 3,
            title: 'Identification & Payment',
            icon: FaIdCard,
            content: [
                'A valid identification document may be required when collecting the equipment.',
                'The renter must provide accurate contact and billing information.',
                'Rental charges, deposits, delivery fees, and additional applicable charges must be settled according to the booking terms.',
                'Any refundable security deposit will be processed according to the condition of the returned equipment.',
            ],
        },
        {
            id: 4,
            title: 'Tool Inspection',
            icon: FaTools,
            content: [
                'Inspect the equipment before leaving the rental location.',
                'Check cables, switches, handles, blades, guards, batteries, wheels, and other important components.',
                'Take photographs of existing damage when necessary.',
                'Never accept equipment with damage that has not been recorded by the rental team.',
            ],
        },
        {
            id: 5,
            title: 'Safe & Proper Usage',
            icon: FaShieldAlt,
            content: [
                'Use the equipment only for its intended purpose.',
                'Follow the operating instructions supplied with the tool.',
                'Wear appropriate personal protective equipment when operating machinery.',
                'Do not remove safety guards, modify equipment, or attempt unauthorized repairs.',
                'Only trained and capable users should operate powered or heavy equipment.',
            ],
        },
        {
            id: 6,
            title: 'Rental Period',
            icon: FaClock,
            content: [
                'Keep track of your agreed rental start and end dates.',
                'The equipment must remain in the renter’s possession and under reasonable care during the rental period.',
                'If you need the equipment for longer, request an extension before the original return deadline.',
                'An extension is only valid after it has been confirmed by ToolRent.',
            ],
        },
        {
            id: 7,
            title: 'Returning the Tool',
            icon: FaTruck,
            content: [
                'The tool must be handed over on or before the agreed rental end date and time.',
                'Return the equipment with all accessories, cables, batteries, cases, attachments, and other supplied items.',
                'The equipment should be returned in a reasonably clean condition.',
                'The rental team will inspect the equipment after it is returned.',
            ],
        },
        {
            id: 8,
            title: 'Late Returns & Penalties',
            icon: FaExclamationTriangle,
            warning: true,
            content: [
                'The tool MUST be handed over by the agreed return date and time.',
                'Late returns may result in additional rental charges or penalties.',
                'The penalty amount may depend on how long the equipment remains overdue.',
                'Repeated late returns may affect future rental eligibility.',
                'If you know you will be late, contact the branch before the rental period ends and request an extension.',
            ],
        },
        {
            id: 9,
            title: 'Damage & Loss',
            icon: FaTools,
            content: [
                'The renter is responsible for taking reasonable care of the equipment during the rental period.',
                'Normal wear and tear is handled according to the rental agreement.',
                'Damage caused by misuse, negligence, unauthorized modification, or improper operation may result in additional charges.',
                'Lost tools, accessories, or components may require replacement charges.',
                'Report damage or loss to ToolRent as soon as possible.',
            ],
        },
        {
            id: 10,
            title: 'Security Deposit',
            icon: FaMoneyBillWave,
            content: [
                'Some equipment may require a refundable security deposit before collection or delivery.',
                'The deposit amount may vary depending on the tool and rental period.',
                'The deposit may be used to cover eligible damage, missing accessories, overdue charges, or other applicable costs.',
                'Once the equipment has been inspected and all outstanding charges are settled, the remaining refundable amount will be processed according to the applicable policy.',
            ],
        },
        {
            id: 11,
            title: 'Delivery & Pickup',
            icon: FaTruck,
            content: [
                'Delivery availability depends on the selected branch, equipment, location, and booking schedule.',
                'Make sure someone is available to receive the equipment at the agreed delivery location.',
                'The renter is responsible for checking the equipment when it arrives.',
                'Pickup or delivery fees may apply depending on the selected service.',
            ],
        },
        {
            id: 12,
            title: 'Need Help?',
            icon: FaPhoneAlt,
            content: [
                'Contact the ToolRent team if you have questions about operating or returning equipment.',
                'Contact us immediately if equipment becomes damaged or unsafe during use.',
                'If an emergency occurs while using equipment, stop using the tool and follow appropriate safety procedures.',
                'For rental extensions, return problems, or booking changes, contact your selected branch as early as possible.',
            ],
        },
    ]

    return (
        <section className="bg-black px-6 py-20 text-white md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                        Rental Guide
                    </p>

                    <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        Rent Smart.
                        <span className="block text-yellow-400">
                            Return Right.
                        </span>
                    </h1>

                    <p className="mt-6 text-base leading-8 text-white/50 sm:text-lg">
                        Everything you need to know before renting, using,
                        maintaining, and returning equipment from ToolRent.
                    </p>
                </div>

                <div className="mt-14 border border-yellow-400/30 bg-yellow-400/[0.04] p-6 sm:p-8">
                    <div className="flex items-start gap-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-yellow-400 text-black">
                            <FaExclamationTriangle />
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-yellow-400">
                                Important Notice
                            </h2>

                            <p className="mt-3 leading-7 text-white/70">
                                You MUST return and hand over the rented tool
                                by the agreed rental end date and time. Failure
                                to return the equipment on time may result in
                                additional rental charges or late-return
                                penalties. If you need more time, request a
                                rental extension before your rental period
                                expires.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    {topics.map((topic) => {
                        const Icon = topic.icon

                        return (
                            <article
                                key={topic.id}
                                className={`border p-7 transition-all duration-300 hover:-translate-y-1 ${topic.warning
                                        ? 'border-yellow-400/40 bg-yellow-400/[0.04]'
                                        : 'border-white/10 bg-white/[0.02] hover:border-yellow-400/40'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center ${topic.warning
                                                ? 'bg-yellow-400 text-black'
                                                : 'bg-yellow-400/10 text-yellow-400'
                                            }`}
                                    >
                                        <Icon />
                                    </div>

                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                                            Section {String(topic.id).padStart(2, '0')}
                                        </span>

                                        <h2 className="mt-1 text-xl font-black">
                                            {topic.title}
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-7 space-y-4">
                                    {topic.content.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-yellow-400" />

                                            <p className="text-sm leading-7 text-white/55">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        )
                    })}
                </div>

                <div className="mt-16 border-t border-white/10 pt-10 text-center">
                    <p className="text-sm leading-7 text-white/35">
                        By renting equipment from ToolRent, you agree to follow
                        the applicable rental terms, safety requirements, return
                        conditions, and responsibilities associated with the
                        equipment.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default RentGuide