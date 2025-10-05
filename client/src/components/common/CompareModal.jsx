import { ShoppingBag, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
const compareProducts = [
  {
    id: 1,
    name: 'Men Black Sports Watch',
    image:
      'https://png.pngtree.com/png-clipart/20250105/original/pngtree-stylish-black-sports-watch-png-image_18749120.png',
    availability: 'In Stock',
    price: 101.0,
    options: {
      size: 'Large',
      color: 'Black',
    },
    quantity: 1,
  },
  {
    id: 2,
    name: 'Circled Ultimate 3D Speaker',
    image:
      'https://pngimg.com/uploads/audio_speakers/audio_speakers_PNG11116.png',
    availability: 'In Stock',
    price: 299.0,
    options: null,
    quantity: 4,
  },
  {
    id: 3,
    name: 'Brown-Black Men Casual Glasses',
    image:
      'https://png.pngtree.com/png-vector/20240628/ourmid/pngtree-a-sunglasses-for-mens-png-image_12907427.png',
    availability: 'In Stock',
    price: 101.0,
    options: {
      size: 'S',
    },
    quantity: 1,
  },
  {
    id: 4,
    name: 'Brown-Black Men Casual Glasses',
    image:
      'https://png.pngtree.com/png-vector/20240628/ourmid/pngtree-a-sunglasses-for-mens-png-image_12907427.png',
    availability: 'In Stock',
    price: 101.0,
    options: {
      size: 'S',
    },
    quantity: 1,
  },
];

function CompareModal({ onClose, productData }) {
  const { compareData, removeproduct } = useContext(ProductContext)
  console.log(compareData);


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex items-center px-4 justify-center bg-black/50'>
      <div className='bg-white w-full max-w-6xl  rounded-lg relative flex flex-col'>
        {/* Fixed Header */}
        <div className='flex justify-between items-center p-4 border-b border-gray-300  bg-white z-10'>
          <h1 className='uppercase font-semibold text-lg'>Compare Box</h1>
          <button onClick={onClose} className='text-gray-600 hover:text-black'>
            <X size={24} />
          </button>
        </div>
        {compareData.length === 0 ? (
          <div className="p-6 text-center text-gray-600">No data to compare</div>
        ) : (
          <div className='overflow-y-auto p-4'>
            <table className='uppercase  borde                                                                                    r border-gray-300 text-sm'>
              <thead>
                <tr className='border border-gray-300 '>
                  <th className='p-2 font-medium text-left w-[260px]'>Features</th>
                  {compareData.map((items) => (
                    <td key={items.id} className='p-2 border-l  w-[260px] border-gray-300 relative'>
                      <button
                        className='bg-gray-800 text-white p-1 top-0 absolute right-0'
                        onClick={() => removeproduct(items._id)}
                      >
                        <X size={18} />
                      </button>
                      <div className='flex gap-2 overflow-auto'>
                        {
                          items.images.map(items => (
                            <img
                              className=' mb-2 w-[150px] h-[150px] object-contain'
                              src={items}
                              alt={items}
                            />
                          ))
                        }

                      </div>
                      <h2 className='text-xs font-medium'>{items.name}</h2>
                    </td>
                  ))}
                </tr>

                <tr className='border border-gray-300'>
                  <th className='p-2 font-medium text-left'>Availability</th>
                  {compareData.map((items) => (
                    <td key={`availability-${items.id}`} className='p-2 border-l border-gray-300'>
                      {items.stock > 0 ? 'In Stock' : 'Out of stock'}
                    </td>
                  ))}
                </tr>

                <tr className='border border-gray-300'>
                  <th className='p-2 font-medium text-left'>Price</th>
                  {compareData.map((items) => (
                    <td key={`price-${items.id}`} className='p-2 border-l border-gray-300'>
                      ${items.price}
                    </td>
                  ))}
                </tr>

                <tr className='border border-gray-300'>
                  <th className='p-2 font-medium text-left'>Action</th>
                  {compareData.map((items) => (
                    <td key={`action-${items.id}`} className='p-2 border-l border-gray-300'>
                      <div className='flex flex-col gap-2 items-center'>
                        <div className='flex items-center gap-2 border border-gray-300 w-fit'>
                          <button className='border-r cursor-pointer border-gray-300 px-2 py-2'>-</button>
                          <p className='font-semibold'>{items.quantity || 0}</p>
                          <button className='border-l cursor-pointer border-gray-300 px-2 py-2'>+</button>
                        </div>
                        <button disabled={items.stock == 0} className={` ${items.stock == 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-900 hover:bg-[#0371a8] cursor-pointer'}  text-nowrap   text-white uppercase text-xs px-3 py-2 flex gap-2 items-center`}>
                          <ShoppingBag size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompareModal;
