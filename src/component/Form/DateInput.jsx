import React from 'react';

const DateInput = ({ label, name, value, onChange, required = false, minDate, maxDate }) => {
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
                type="date"
                min={minDate}
                max={maxDate}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 rounded border border-gray-100 bg-white text-gray-900 placeholder-gray-400
                           focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300/40
                           hover:border-gray-300
                           transition-all duration-200 shadow-sm hover:shadow-md"
            />
        </div>
    );
};

export default DateInput;
