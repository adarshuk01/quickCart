import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { useParams } from 'react-router-dom'
import { newsData } from '../assets/Data/newsData'
import { Calendar, ChartBar, MessageCircle, User } from 'lucide-react'

function NewsDetails() {
    const { id } = useParams()
    const NewsDetails = newsData.find(items => items.id == id)
    console.log(NewsDetails);

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { day, month };
    }
    const { day, month } = formatDate(NewsDetails.date);




    return (
        <div className='space-y-4'>
            <Breadcrumb page={'news'} label={NewsDetails.title} />
            <div>

                <img className='p-2 border  border-gray-300 w-full ' src={NewsDetails.img} alt="" />
            </div>
            <div className='flex items-start gap-4'>
                <div className='uppercase flex flex-col w-fit text-center border  border-gray-300 '>
                    <span className='py-3 text-2xl font-bold text-gray-800'>{day}</span>
                    <span className='bg-gray-800 text-white font-bold px-3'>{month}</span>

                </div>
                <div className='space-y-4'>
                    <h1 className='text-2xl font-semibold'> {NewsDetails.title}</h1>
                    <p className='text-gray-600 font-light'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum sed quis illo doloremque sequi ipsum dignissimos quo quaerat reiciendis dolore. At tempora voluptates soluta nam, a fugit omnis rerum id magni dolorem repudiandae saepe unde, corrupti dolore nisi. Laborum non aut modi id? Nobis error asperiores saepe itaque eum optio hic quod est molestiae tenetur adipisci aut id, tempora odio, esse culpa expedita quasi. Facere fugit quia nihil voluptates ducimus suscipit, iure incidunt saepe pariatur natus, corporis aliquam.</p>
                    <hr className='text-gray-300' />
                    <div className='flex gap-5'>
                        <div className='flex gap-1 items-center text-gray-600 font-light'><User /> By Admin</div>
                        <div className='flex gap-1 items-center text-gray-600 font-light'><MessageCircle />0 comment</div>
                    </div>
                    <hr className='text-gray-300' />        </div>
            </div>
            <div className='mt-10 space-y-2'>
                <h2 className='uppercase mb-2 font-bold text-xl'>Leave a comment</h2>
                <p className='font-light text-gray-700'>Your email address will not be published. Required fields are marked *</p>
                <form className='space-y-2' action="">
                    <textarea placeholder='Message*' className='w-full border px-2 py-3 border-gray-400 focus:outline-none' rows={6} name="" id=""></textarea>
                    <div className='grid grid-cols-2 gap-4'>
                        <input placeholder='Name*'  type="text" className='border px-2 py-3 border-gray-400 focus:outline-none' name="" id="" />
                        <input placeholder='Email*' className='border px-2 py-3 border-gray-400 focus:outline-none' type="text" name="" id="" />
                    </div>
                    <p>Please note, comments must be approved before they are published</p>
                    <button className='px-4 py-2 bg-[#0371a8] text-white'>Post comment</button>
                </form>

            </div>
        </div>
    )
}

export default NewsDetails
