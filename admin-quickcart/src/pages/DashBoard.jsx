import React from 'react'
import StatsCards from '../components/Dashboard/StatsCards'
import OrdersChart from '../components/Dashboard/OrdersChart'
import Last7DaysSales from '../components/Dashboard/Last7DaysSales'

function DashBoard() {
  return (
    <div className='space-y-6'>
      <h1 className='font-bold text-[24px]'>Dashboard</h1>
      <StatsCards/>
      <div className='grid grid-cols-1 lg:grid-cols-7 gap-6'>
        <div className='lg:col-span-5'>
             <OrdersChart/>
        </div>
        <div className='lg:col-span-2'>
            <Last7DaysSales/>

        </div>

      </div>
     
    </div>
  )
}

export default DashBoard
