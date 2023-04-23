import React from "react";

const InputBox = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  styles = "",
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-xl pl-3 font-semibold text-white">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full mt-2 py-2 rounded-full text-xl border-2 px-4 outline-none focus:border-[#1D9BF0]  ${styles}`}
      />
    </div>
  );
};

export default InputBox;
