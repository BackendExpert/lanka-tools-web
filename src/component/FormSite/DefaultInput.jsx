import React from 'react'

const DefaultInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-semibold mb-2 text-white"
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-[#454342] border border-gray-600
                           text-white placeholder-gray-500
                           focus:outline-none focus:border-yellow-400
                           hover:border-gray-500
                           transition-colors duration-200
                           placeholder:text-sm"
            />
        </div>
    )
}

export default DefaultInput