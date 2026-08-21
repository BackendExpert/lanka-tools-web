import React from 'react';

const DefaultButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-7 py-3 font-bold text-black transition duration-300 ${
                disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-300'
            }`}
        >
            {label}
        </button>
    );
};

export default DefaultButton;