import React, { useRef } from 'react'
import ProductCard from '../common/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Sections({ label, productData }) {
  const scrollRef = useRef(null)
  const scrollAmount = 300

  const scrollLeft = () => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    if (container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    if (Math.ceil(container.scrollLeft) >= maxScrollLeft) {
      container.scrollLeft = 0
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* Section Header */}
      <div className='flex items-center gap-2 mb-6'>
        <span className='h-[0.1px] w-full bg-gray-300'></span>
        <span className='uppercase text-nowrap text-xl font-bold text-gray-700'>
          {label}
        </span>
        <span className='h-[0.1px] w-full bg-gray-300'></span>
      </div>

      {/* Carousel Wrapper with Arrows */}
      <div className='relative'>
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className='absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10'
        >
          <ChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className='absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10'
        >
          <ChevronRight />
        </button>

        {/* Scrollable Product List */}
        <div
          ref={scrollRef}
          className='flex gap- overflow-x-scroll scroll-smooth no-scrollbar px-2'
        >
          {productData.map((item, index) => (
            <div key={index} className='shrink-0 py-2 w-[220px]'>
              <ProductCard productData={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sections
