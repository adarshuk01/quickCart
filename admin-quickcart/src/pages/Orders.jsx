import React from 'react'
import OrderTable from '../components/orders/OrderTable'
import Button from '../common/Button'
import { FiPlus } from 'react-icons/fi'
import { FaFileExport } from 'react-icons/fa'

function Orders() {
  return (
    <div>
         <div className='flex justify-between items-center flex-wrap gap-4 mb-4'>
              <h1 className='text-[24px] font-bold'>Orders</h1>
              
              <div className='flex gap-2'>
                <Button
                  label="Export"
                  icon={FaFileExport}
                  variant="outlined"
                  onClick={() => console.log('Export clicked')}
                />
                <Button
                  label="Add Orders"
                  icon={FiPlus}
                  variant="filled"
                 
                />
              </div>

            </div>
      <OrderTable/>
    </div>
  )
}

export default Orders
