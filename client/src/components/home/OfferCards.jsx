import React, { useContext } from 'react';
import Slider from 'react-slick';
import { ProductContext } from '../../context/ProductContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function OfferCards() {
    const { discounts } = useContext(ProductContext);
    console.log('discounts', discounts);

    const NextArrow = ({ onClick }) => (
        <div
            onClick={onClick}
            className="absolute top-1/2 -right-5 transform -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer shadow-lg"
        >
            <ChevronRight size={20} />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div
            onClick={onClick}
            className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer shadow-lg"
        >
            <ChevronLeft size={20} />
        </div>
    );

  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2, // Default: laptop and tablet
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 768, // Mobile: screens < 768px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};



    return (
        <div className="w-full mx-auto p-4 relative">
            <Slider {...settings}>
                {discounts.map((item, index) => (
                    <Link to={`/offers/${item._id}`} key={index} className="p-2">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full lg:h-[450px] object-cover rounded-lg shadow-lg" 
                        />
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

export default OfferCards;
