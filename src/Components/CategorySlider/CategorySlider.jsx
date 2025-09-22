import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {

    const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed:2000,
};
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(null)

    async function getCategories() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategories(data.data);
        setLoading(false);
    }

    useEffect(() => {
        getCategories();
    } , [])

return <>
    <Slider {...settings}>
        {categories?.map((category, index) => <div key={index} className='my-3 cursor-pointer'>
            <img src={category.image} alt={category.name} className='w-full h-[200px] object-cover object-top' />
            <h3>{category.name}</h3>
        </div>
        )}
    </Slider>
</>
}
