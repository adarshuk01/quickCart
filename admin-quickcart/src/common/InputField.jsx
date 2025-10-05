import React from 'react';

function InputField({ label, type = 'text', placeholder, value, onChange, id, name }) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id}>{label}</label>
      <input
        required
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className='border border-gray-300 focus:outline-none p-2 rounded'
      />
    </div>
  );
}

export default InputField;
