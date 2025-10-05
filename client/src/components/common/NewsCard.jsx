import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return { day, month };
}

function NewsCard({ newsdata }) {
  const { day, month } = formatDate(newsdata.date);

  return (
    <div className='w-[290px] bg-white relative py-3  rounded-md overflow-hidden'>
      {/* Date Badge */}
      <div className='bg-gray-900 uppercase text-white absolute  flex flex-col w-fit py-2 px-2 items-center rounded'>
        <span className='font-extrabold text-xl'>{day}</span>
        <span className='text-xs font-light -mt-1'>{month}</span>
      </div>

      {/* Content */}
      <div className='space-y-2  px-2 pb-4  '>
        <img
          src={newsdata.img}
          alt={newsdata.title}
          className='w-full h-[160px] object-cover rounded'
        />
        <h1 className='text-lg font-light line-clamp-2'>{newsdata.title}</h1>
        <p className='text-sm font-light text-gray-600 line-clamp-3'>{newsdata.desc}</p>
        <Link to={`/news/${newsdata.id}`} className='text-sm font-light flex items-center text-blue-600 hover:underline'>
          Read more <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
