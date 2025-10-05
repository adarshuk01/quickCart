import React from 'react'
import Button from '../../common/Button'
import { FiPlus } from 'react-icons/fi'
import { FaFileExport } from 'react-icons/fa'

function Header() {
  return (
    <div className='flex justify-between'>
        <h1 className='text-[24px] font-bold'>Products</h1>
        <div className='flex gap-2'>
                             <Button label="Export" icon={FaFileExport} variant="outlined" onClick={() => console.log('Add clicked')} />

              <Button label="Add Product" icon={FiPlus} variant="filled" onClick={() => console.log('Add clicked')} />
        </div>
      
    </div>
  )
}

export default Header
