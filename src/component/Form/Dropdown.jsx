import React from 'react';

const Dropdown = ({ label, name, value, onChange, required = false, options = [] }) => {
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
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-400
                           focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/40
                           hover:border-gray-300
                           transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <option value="">Select an option</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
