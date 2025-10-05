import { ChevronRight } from 'lucide-react'
import React from 'react'

function PageHeader({page}) {
  return (
    <div className='bg-gray-200 h-[175px] flex justify-center items-center'>
        <div>
        <div className='flex text-xs justify-center items-center '> <span className='text-[#0371a8]'>HOME</span>   <ChevronRight size={16} /> <span>{page}</span></div>
        <h1 className='text-2xl uppercase text-center font-bold'>{page}</h1>
        </div>


      
    </div>
  )
}

export default PageHeader
