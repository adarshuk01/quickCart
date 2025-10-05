import React from 'react'
import { CircleDollarSign, Headset, TruckElectric } from 'lucide-react';


function Features() {
    const featureData=[
        {
            icon:<TruckElectric size={30}  strokeWidth={'1px'}/>,
            title:'FREE SHIPPING & RETURN',
            sub:'Free shipping on all orders over $99.'
        }, {
            icon:<CircleDollarSign size={30}  strokeWidth={1}/>,
            title:'MONEY BACK GUARANTEE',
            sub:'100% money back guarantee.'
        }, {
            icon:<Headset size={30}  strokeWidth={1}/>,
            title:'ONLINE SUPPORT 24/7',
            sub:'Lorem ipsum dolor sit amet.'
        }
    ]
  return (
    <div className='flex flex-wrap  lg:justify-evenly gap-10 items-start lg:h-[100px] bg-white '>
        {
            featureData.map(items=>(
                <div className='flex hover:border-b-4 border-b-2 h-fit rounded border-r-1 border-l-1 border-gray-500 py-2 px-4 bg-white gap-2 w-full lg:w-fit items-center'>
                    <span>{items.icon}</span>
                    <div>
                    <h1 className='font-bold'>{items.title}</h1>
                    <p className='font-light'>{items.sub}</p>

                    </div>
                </div>
            ))
        }
      
    </div>
  )
}

export default Features
