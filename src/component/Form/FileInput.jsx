import React from 'react';

const FileInput = ({
    label,
    name,
    onChange,
    required = false,
    multiple = false,
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
                type="file"
                name={name}
                id={name}
                onChange={onChange}
                required={required}
                multiple={multiple}
                className="
                    w-full h-[50px]
                    rounded border border-gray-200
                    bg-white text-gray-600
                    text-sm
                    focus:outline-none
                    focus:border-gray-100
                    focus:ring-2 focus:ring-gray-300/40
                    hover:border-gray-300
                    transition-all duration-200
                    shadow-sm hover:shadow-md
                    file:h-full
                    file:px-4
                    file:border-0
                    file:mr-3
                    file:bg-yellow-400
                    file:text-black
                    file:font-semibold
                    file:cursor-pointer
                    hover:file:bg-yellow-500
                "
            />
        </div>
    );
};

export default FileInput;