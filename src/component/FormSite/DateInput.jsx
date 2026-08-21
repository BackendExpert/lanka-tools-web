import React from 'react'

const DateInput = ({
    label,
    name,
    value,
    onChange,
    required = false,
    minDate,
    maxDate
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
                type="date"
                min={minDate}
                max={maxDate}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-[#454342] border border-gray-600 px-4 py-3 text-white outline-none
                           focus:border-yellow-400
                           hover:border-gray-500
                           transition-colors duration-200"
            />
        </div>
    )
}

export default DateInput