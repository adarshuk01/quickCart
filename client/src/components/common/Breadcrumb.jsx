import { ChevronRight, Home } from 'lucide-react'
import React from 'react'

function Breadcrumb({label,page}) {
  return (
    <div className='flex items-center font-light text-sm uppercase text-gray-600'>
        <Home size={18} strokeWidth={1} />
         <ChevronRight size={18} strokeWidth={1} />
         <span>
         {page}
         </span>
         {label&&<div className='flex'> <ChevronRight size={18} strokeWidth={1} />
        <span>{label}</span></div>}
       

      
    </div>
  )
}

export default Breadcrumb
