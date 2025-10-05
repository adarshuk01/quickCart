import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useRef } from 'react'
import NewsCard from '../common/NewsCard'
import { newsData } from '../../assets/Data/newsData'

// const newsData = [
//   {
//     img: "https://cdn.shopify.com/s/files/1/0080/4844/3455/files/Mens_Fashion_Trends_2025.png?v=1745563765",
//     title: "Summer 2025 Fashion Trends Take Off",
//     desc: "Lightweight fabrics, vibrant colors, and eco-conscious designs dominate this summer’s fashion scene. Leading online stores report a surge in cotton and linen clothing sales as heatwaves hit across the country.",
//     date: "2025-07-01",
//   },
//   {
//     img: "https://financesaathi.com/adm/uploads/_1972_smartphone-cao-cap-1704300314241.webp",
//     title: "Smartphone Sales Spike Ahead of Monsoon Deals",
//     desc: "E-commerce giants kick off their monsoon sale season with massive discounts on smartphones and gadgets. Brands like Samsung and OnePlus lead the charts in sales volume.",
//     date: "2025-06-29",
//   },
//   {
//     img: "https://www.hindustantimes.com/ht-img/img/2025/06/26/1600x900/washin_machine_for_monsoon_season_1750927888454_1750927897481.jpg",
//     title: "Washing Machines See Demand Surge During Rainy Season",
//     desc: "As humidity rises, urban households are opting for newer energy-efficient washing machines. Online platforms have reported a 38% increase in appliance purchases this month.",
//     date: "2025-06-27",
//   },
//   {
//     img: "https://media.licdn.com/dms/image/v2/D4D12AQEQx4IjQRluYA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1683192556840?e=2147483647&v=beta&t=tPBoRqKAyRPr-6XT1U8je-ftBNhWnSXiZuqbSDAbbBY",
//     title: "Virtual Try-Ons Revolutionize Online Clothing Shopping",
//     desc: "Fashion retailers now offer AR-based try-on features to reduce return rates and enhance buyer confidence. User engagement on product pages has doubled since launch.",
//     date: "2025-06-25",
//   },
//   {
//     img: "https://rukminim2.flixcart.com/fk-p-flap/824/366/image/1a97512ec6a50f3a.jpg?q=90",
//     title: "Smart TV Prices Drop as New Models Launch",
//     desc: "Brands release AI-powered smart TVs with enhanced voice control and app integration. Retailers are slashing prices of older models to clear inventories.",
//     date: "2025-06-22",
//   },
//   {
//     img: "https://pureplanetclub.com/cdn/shop/articles/shutterstock_1938899440-min_2000x.jpg?v=1678661275",
//     title: "Sustainable Fashion Labels Gain Ground Online",
//     desc: "Consumers are leaning into slow fashion as searches for ‘organic clothing’ hit record highs. Top marketplaces are adding eco tags and sustainability filters.",
//     date: "2025-06-19",
//   },
//   {
//     img: "https://www.cnet.com/a/img/resize/d3982ccbbfed2c325962b8776a2da123c90b414c/hub/2024/12/24/91fc59a6-9e8a-4c9a-9bb6-b952cba4305e/lg-ai-furon.png?auto=webp&fit=crop&height=675&width=1200",
//     title: "AI Assistants Now Suggest Home Appliances",
//     desc: "E-commerce platforms are using AI to recommend home appliances based on user behavior and preferences, significantly improving customer satisfaction and purchase rates.",
//     date: "2025-06-15",
//   },
//   {
//     img: "https://kartikmehtablog.com/wp-content/uploads/2024/11/Smart-Kitchen.jpg",
//     title: "Smart Kitchen Gadgets Are the New Essentials",
//     desc: "From air fryers to smart rice cookers, tech-savvy appliances are becoming common in modern kitchens. Flash sales are driving adoption in tier-2 and tier-3 cities.",
//     date: "2025-06-12",
//   },
//   {
//     img: "https://images.squarespace-cdn.com/content/v1/6025839b20063662a39bf9ec/b922b82b-4183-49e1-af86-05378a2a1c78/IMG_4998.jpg",
//     title: "Photography Gear in Demand for Content Creators",
//     desc: "Online sellers report record sales of ring lights, mirrorless cameras, and portable tripods. Gen Z influencers are investing more in content equipment than ever before.",
//     date: "2025-06-08",
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuSmZxbD6DaGsZ7j7BEwnWxyCGCGusCQDSCA&s",
//     title: "Modular Kitchen Designs Dominate E-commerce Trends",
//     desc: "Buyers are exploring home transformation tools and modular kitchen fittings as part of a growing DIY renovation movement fueled by short-form video tutorials.",
//     date: "2025-06-04",
//   },
// ];


function NewsSec({label}) {
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
            <div className='flex items-center gap-2 mb-6 '>
                <span className='h-[0.1px] w-full bg-gray-300'></span>
                <span className='uppercase text-nowrap text-xl font-bold text-gray-700'>
                    {label}
                </span>
                <span className='h-[0.1px] w-full bg-gray-300'></span>
            </div>
             {/* Carousel Wrapper with Arrows */}
            <div className='relative '>
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
                    className='flex gap-2 overflow-x-scroll scroll-smooth no-scrollbar px-10'
                >
                    {newsData.map((item, index) => (
                        <div>
                       <NewsCard newsdata={item} />
                       </div>
                    ))}
                </div>
            </div>

      
    </div>
  )
}

export default NewsSec
