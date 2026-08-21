import React from 'react';

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
                    className="block text-xs font-semibold mb-2"
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
                className="w-full px-4 py-3 rounded border border-gray-200 bg-white text-gray-600 placeholder-gray-400
                           focus:outline-none focus:border-gray-100 focus:ring-2 focus:ring-gray-300/40
                           hover:border-gray-300
                           transition-all duration-200 shadow-sm hover:shadow-md
                           placeholder:text-sm"
            />
        </div>
    );
};

export default DefaultInput;
