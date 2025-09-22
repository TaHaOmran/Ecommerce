import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';

export default function ProductDetails() {
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
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    let { addProduct } = useContext(CartContext);

    let { id } = useParams();

    async function getProduct(productId) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        setProduct(data.data);
        setLoading(false);
    }

    useEffect(() => {
        getProduct(id);
    } , [])
return <>
    <h3 className='text-sans font-extrabold text-4xl text-center my-5'> Product Details</h3>
    
    {loading ? <Loading/> :
    <div className="flex p-8 items-center">
        <div className="w-1/4">
        <Slider {...settings}>
            {product.images.map((image , index)=> <img key={index} src={image} className='w-full cursor-pointer' alt={product.title} />)}
        </Slider>
        </div>
        <div className="w-3/4 p-6">
            <h2>{product.title}</h2>
            <p className='mt-2 text-gray-600'>{product.description}</p>
            <p>{ product.category.name}</p>
            <div className="flex justify-between">  
                <span>{ product.price } EGP</span>
                <span><i className='fas fa-star rating-color'></i> { product.ratingsAverage }</span>
            </div>
            <button onClick={()=> addProduct(product.id)} className='btn w-full'><i class="fa-solid fa-cart-plus fa-lg pe-1"></i>Add To Cart</button>
        </div>
    </div>}
    
</>
}
