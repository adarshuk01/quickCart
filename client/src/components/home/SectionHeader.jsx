import React from 'react'

function SectionHeader({label}) {
  return (
    <div className='flex items-center'>
      <span className='h-[0.1px] w-full bg-gray-300'></span>
      <span className='uppercase text-nowrap font-bold text-gray-700'>{label}</span>
      <span className='h-[0.1px] w-full bg-gray-300'></span>
    </div>
  )
}

export default SectionHeader
