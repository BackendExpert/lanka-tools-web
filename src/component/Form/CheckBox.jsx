import React from 'react'

const CheckBox = ({
    label,
    name,
    checked,
    onChange,
    required = false,
}) => {
    return (
        <div className="mb-5">

            <label
                htmlFor={name}
                className="flex items-center gap-3 cursor-pointer"
            >

                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    checked={checked}
                    onChange={onChange}
                    required={required}
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-300 cursor-pointer"
                />

                {label && (
                    <span className="text-xs font-semibold text-gray-700">
                        {label}
                    </span>
                )}

            </label>

        </div>
    )
}

export default CheckBox