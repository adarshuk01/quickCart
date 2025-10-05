import { Facebook,Twitter,Instagram } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'

function NavLinks() {
    const navlinks=[
        {
        label:'My Account',
        link:'/account'
        },
        {
        label:'About Us ',
        link:'/aboutus'
        },
        {
        label:'Blog',
        link:'/blog'
        },
        {
            label:'My Wishlist',
            link:'/wishlist'
        },
        {
            label:'Cart',
            link:'/wishlist'
        },
        {
            label:'Login',
            link:'/wishlist'
        }

    ]
  return (
    <div className='flex bg-slate-100 justify-evenly items-center  text-xs px-2 py-4  font-normal border-b border-gray-300  text-gray-600'>
        <h1 className='text-gray-600 hidden md:block lg:block '>FREE RETURNS. STANDARD SHIPPING ORDERS $99+</h1>
        <div className='flex gap-4  lg:flex-wrap justify-end items-center'>
        <div className=' hidden lg:flex  gap-3 text-gray-600 h-[15px]'>
            {
                navlinks.map(items=>(
                   <Link className='hover:border-b'>{items.label}</Link>
                ))
            }

        </div>
        <div className='block lg:hidden'>
            <select  className='focus:outline-none border-none text-sm'  name="" id="">
                <option  className='text-xs' value="">Links</option>
                {navlinks.map(items=>(
                    <option className='text-xs' value="">{items.label}</option>
                ))}
            </select>
        </div>
        <div className='flex gap-2'>
            <select className='focus:outline-none border-none' name="" id="">
                <option value="">USD</option>
                <option value="">EUR</option>
            </select>
            <select className='focus:outline-none border-none' name="" id="">
                <option value="">ENGLISH</option>
                <option value="">HINDI</option>
            </select>
        </div>
        <div className='flex gap-2 text-xs'>
            <Facebook size={18} />
            <Twitter size={18} />
            <Instagram size={18} />
        </div>
        </div>
      
    </div>
  )
}

export default NavLinks
