import React from 'react';

const TextAreaInput = ({
    label,
    name,
    rows = 4,
    value,
    onChange,
    placeholder = '',
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
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="
                    w-full px-4 py-2 rounded border border-gray-300 
                    bg-white text-gray-900 placeholder-gray-400
                    focus:outline-none focus:border-gray-400 
                    focus:ring-2 focus:ring-gray-300/40
                    hover:border-gray-300
                    transition-all duration-200 
                    shadow-sm hover:shadow-md
                    resize-none placeholder:text-sm
                "
            />
        </div>
    );
};

export default TextAreaInput;
