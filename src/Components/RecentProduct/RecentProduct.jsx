import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProduct.module.css'
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';
import { WishListContext } from '../../context/WishListContext';

export default function RecentProduct() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    let { addProduct } = useContext(CartContext);
    let { addWishlist , deleteProductWishList } = useContext(WishListContext);
    

    async function getProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);

        setProducts(data.data);
        setLoading(false);
        
    }

    useEffect(() => {
        getProduct();
    },[])


    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let {data , isLoading , isFetching , isError}=useQuery({
        queryKey:['recentProducts'],
        queryFn:getProducts,
        gcTime:3000,
    })

    const [wishlist, setWishlist] = useState({}); // { [productId]: true/false }

    const handleWishlistClick = (productId) => {
        const isInWishlist = wishlist[productId];
      
        // 1. بدّل الحالة المحلية
        setWishlist((prev) => ({
                ...prev,
                [productId]: !isInWishlist,
            }));
        // 2. نفذ الإجراء حسب الحالة
        if (isInWishlist) {
            deleteProductWishList(productId); // ⬅️ استدعِ دالة إزالة
        } else {
            addWishlist(productId); // ⬅️ استدعِ دالة إضافة
        }
    };


return <div className='bg-base'>
    <h2 className='text-sans font-extrabold text-4xl text-center my-5'>Recent Product</h2>
    {isLoading? <Loading/>: <div className='flex flex-wrap py-8 gap-y-4 justify-center'>
        {data?.data.data.map((product)=> <div key={product.id} className='w-1/6'>
            <div className="product p-2 ">
                <Link to={`/productdetails/${product.id}`}>
                    <img src={product.imageCover} className='w-full' alt={product.id} />
                    <h3 className='text-main'>{ product.category.name}</h3>
                    <h3>{product.title.split(' ' , 2).join(' ')}</h3>
                    <div className="flex justify-between">  
                        <span>{ product.price } EGP</span>
                        <span><i className='fas fa-star rating-color'></i> { product.ratingsAverage }</span>
                    </div>
                </Link> 
                <div key={product.id} className="rounded shadow">
                    <div className="flex justify-end">
                        <i
                            onClick={() => handleWishlistClick(product.id)}
                            className={`fa-heart text-xl my-3 cursor-pointer transition-colors duration-300 ${
                            wishlist[product.id] ? 'fa-solid text-red-600' : 'fa-regular text-gray-500'}`}
                        ></i>
                    </div>
                </div>
                <button onClick={()=> addProduct(product.id)}  className='btn w-full focus:ring-0'><i class="fa-solid fa-cart-plus fa-lg pe-1"></i>Add To Cart</button>
            </div>
            
        </div>)}
    </div>}

</div>
}
