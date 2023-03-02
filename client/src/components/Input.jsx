import React from "react";

const Input = ({
  label,
  type,
  name,
  placeholder,
  required,
  onChange,
  large,
  defaultValue,
}) => {
  return (
    <div className={`${large && "w-[85%]"} `}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <input
        defaultValue={defaultValue}
        type={type}
        name={name}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
