import React, { forwardRef } from "react";

const InputField = forwardRef(
  ({ label, value, onChange, type = "text", error = "", id, onKeyDown = () => {} }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className={`block font-bold ${error ? "text-[#ff0000]" : "text-teal-400"}`}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={ref}
          className={`w-full p-3 border border-gray-300 rounded mt-2 focus:outline-offset-2 ${
            error ? "focus:outline-[#ff0000]" : "focus:outline-teal-400"
          }`}
          autoComplete="Input"
          placeholder={label}
        />
        {error && <div className="text-[#ff0000] text-sm">{error}</div>}
      </div>
    );
  }
);

export default InputField;
