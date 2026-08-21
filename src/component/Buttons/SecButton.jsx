import React from 'react'

const SecButton = ({
    label = "Rent Now",
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`border border-white/25 bg-black/30 px-7 py-3 font-bold text-white backdrop-blur-md transition duration-300 ${
                disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:border-yellow-400 hover:bg-yellow-400/10'
            }`}
        >
            {label}
        </button>
    )
}

export default SecButton