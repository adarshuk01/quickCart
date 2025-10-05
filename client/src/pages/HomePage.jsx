import React from 'react'
import PageHeader from '../components/common/PageHeader'
import Carousel from '../components/home/Carousel'
import Features from '../components/home/Features'
import OfferCards from '../components/home/OfferCards'
import SectionHeader from '../components/home/SectionHeader'
import Sections from '../components/home/Sections'
import Banner from '../components/home/Banner'
import Modal from '../components/common/Modal'
import CategorySec from '../components/home/CategorySec'
import FeatureSection from '../components/home/Services'
import Banner2 from '../components/home/Banner2'
import NewsSec from '../components/home/NewsSec'
import { productData } from '../assets/Data/productData'
import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

function HomePage() {
//   const productData = [
//   {
//     id: 1,
//     name: "Sports Travel Bag",
//     img: "https://porto-demo.myshopify.com/cdn/shop/products/MenSportsTravelBag_400x400_crop_center.jpg?v=1606122782",
//     price: 49.99,
//   },
//   {
//     id: 2,
//     name: "Wireless Headphones",
//     img: "https://static.vecteezy.com/system/resources/previews/024/558/883/non_2x/black-wireless-headphones-isolated-on-transparent-background-ai-generated-png.png",
//     price: 89.99,
//   },
//   { 
//     id: 3,
//     name: "Smart Watch",
//     img: "https://file.aiquickdraw.com/imgcompressed/img/compressed_10bc64b044f7b628ae9c772d27355c0e.webp",
//     price: 129.99,
//   },
//   {
//     id: 4,
//     name: "Running Shoes",
//     img: "https://static.vecteezy.com/system/resources/previews/046/323/598/non_2x/pair-of-colorful-sports-shoes-for-active-lifestyle-png.png",
//     price: 74.99,
//   },
//   {
//     id: 5,
//     name: "Backpack",
//     img: "https://file.aiquickdraw.com/imgcompressed/img/compressed_0c89d1bc202f5f9b787a15efa3576f03.webp",
//     price: 39.99,
//   },
//   {
//     id: 6,
//     name: "Bluetooth Speaker",
//     img: "https://pngimg.com/d/wireless_speaker_PNG36.png",
//     price: 59.99,
//   },
//   {
//     id: 7,
//     name: "Fitness Tracker",
//     img: "https://png.pngtree.com/png-clipart/20240903/original/pngtree-vital-smart-watch-and-fitness-tracker-png-image_15920500.png",
//     price: 45.99,
//   },
//   {
//     id: 8,
//     name: "Sunglasses",
//     img: "https://gallery.yopriceville.com/downloadfullsize/send/9264",
//     price: 29.99,
//   },
//   {
//     id: 9,
//     name: "Gaming Mouse",
//     img: "https://png.pngtree.com/png-clipart/20240520/original/pngtree-wireless-gaming-mouse-png-image_15140813.png",
//     price: 49.49,
//   },
//   {
//     id: 10,
//     name: "Wireless Keyboard",
//     img: "https://pngimg.com/d/keyboard_PNG101863.png",
//     price: 69.99,
//   },
//   {
//     id: 11,
//     name: "Water Bottle",
//     img: "https://png.pngtree.com/png-vector/20240727/ourmid/pngtree-stainless-steel-water-bottle-png-image_13223174.png",
//     price: 19.99,
//   },
//   {
//     id: 12,
//     name: "Laptop Stand",
//     img: "https://static.vecteezy.com/system/resources/thumbnails/041/453/370/small/laptop-stand-on-transparent-background-png.png",
//     price: 34.99,
//   },
//   {
//     id: 13,
//     name: "Portable Charger",
//     img: "https://png.pngtree.com/png-vector/20240728/ourmid/pngtree-power-bank-portable-charger-png-image_13261156.png",
//     price: 24.99,
//   },
//   {
//     id: 14,
//     name: "Noise Cancelling Earbuds",
//     img: "https://www.gonoise.com/cdn/shop/files/1_98196dd8-2752-480e-94c7-6b60981629c1_grande.png?v=1694430243",
//     price: 79.99,
//   },
//   {
//     id: 15,
//     name: "LED Desk Lamp",
//     img: "https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-study-lamp-3d-png-image_10119145.png",
//     price: 22.99,
//   },
// ];

const {products}=useContext(ProductContext)
const featuredProduct=products.filter(items=>items.isFeatured==true)
  return (
    <div >
      
    <div className='space-y-12'>

      <Carousel />
      {/* <Features /> */}
      <OfferCards />


      <Sections productData={featuredProduct.slice(0,7)} label={'FEATURED PRODUCTS'} />
      <Sections productData={products.slice(5,20)} label={'NEW ARRIVALS'} />

      <Banner/>
      <CategorySec label={'BROWSE OUR CATEGORIES'}/>
      <FeatureSection/>
      <Banner2/>
      <NewsSec label={'latest news'}/>

    </div>
    </div>
  )
}

export default HomePage
