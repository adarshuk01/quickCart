import React from 'react'

function InputField({label,onChange,name,value,type}) {
  return (
    <div>
        <label htmlFor="">{label}</label> <br />
        <input onChange={onChange}  type={type}
            name={name}
            value={value} 
            required 
            className='border px-3 py-2 border-gray-400 focus:outline-none w-full'/>
      
    </div>
  )
}

export default InputField
