import React from 'react'
import style from './MainSlider.module.css'
import slide_1 from '../../assets/images/slider-image-1.jpeg'
import slide_2 from '../../assets/images/slider-image-2.jpeg'
import slide_3 from '../../assets/images/slider-image-3.jpeg'
import banner_2 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {

    const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed:2000,
};

return <>
    <div className="flex">
        <div className="w-3/4 cursor-pointer">
        <Slider {...settings}>
            <img src={slide_1} className='w-full h-[400px] object-cover' alt="slide_1" />
            <img src={slide_2} className='w-full h-[400px] object-cover' alt="slide_2" />
            <img src={slide_3} className='w-full h-[400px] object-cover' alt="slide_3" />
        </Slider>
        </div>
        <div className="w-1/4">
            <img src={slide_1} className='w-full h-[200px]' alt="banner-1" />
            <img src={slide_3} className='w-full h-[200px]' alt="banner-2" />
        </div>
    </div>
</>
}
