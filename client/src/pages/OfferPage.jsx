import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import ProductCard from '../components/common/ProductCard'

function OfferPage() {
    const {id}=useParams()
    const {fetchDiscountbyid,discount,discounts}=useContext(ProductContext)

    console.log('discount',discount);
    

    useEffect(()=>{
        fetchDiscountbyid(id)
    },[id])
  return (
    <div>
        <div className='grid grid-cols-1 lg:grid-cols-6 gap-5 justify-center'>
            
            <div className='lg:col-span-2  '>
                <img className='rounded-lg w-full mx-auto ' src={discount.image} alt="" />
               
            </div>
            <div className='col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-2'>

                {discount?.products?.map((items)=>(
                    <div>
                        <ProductCard productData={items} />
                    </div>
                ))}
            </div>

        </div>
      
    </div>
  )
}

export default OfferPage
