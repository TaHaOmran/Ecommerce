import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import Loading from '../Loading/Loading'
import style from './Products.module.css'
import { WishListContext } from '../../context/WishListContext';

export default function Products() {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    let { addProduct } = useContext(CartContext);
    let { addWishlist , deleteProductWishList } = useContext(WishListContext);
    

    async function getProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);

        setProducts(data.data);
        setLoading(false);
        
    }

    useEffect(() => {
        getProduct();
    }, [])

    const productCategories = [...new Set(products.map(p => p.category.name))];
    // filter and sort products
    const filteredProducts = products
        .filter(p => selectedCategory ? p.category.name === selectedCategory : true)
        .sort((a, b) => {
            if (sortOrder === 'high') return b.ratingsAverage - a.ratingsAverage;
            if (sortOrder === 'low') return a.ratingsAverage - b.ratingsAverage;
            return 0;
        });
    
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

    return <>
    {loading ? <Loading /> : (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">All Products</h2>

            <div className="flex flex-col sm:flex-row m-4 gap-6 sm:gap-16">
                <div className="flex items-center gap-2">
                    <p className="font-medium">Select by Category:</p>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-52 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main"
                    >
                        <option value="">All Products</option>
                            {productCategories.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <p className="font-medium">Sort by Rating:</p>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-52 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main"
                    >
                        <option value="">Default</option>
                        <option value="high">High Rating</option>
                        <option value="low">Low Rating</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap gap-y-6 justify-center">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col h-full">
                                <Link to={`/productdetails/${product.id}`} className="mb-3 block">
                                    <img
                                        src={product.imageCover}
                                        className="w-full h-48 object-cover rounded-md"
                                        alt={product.title}
                                    />
                                    <h3 className="text-main text-sm mt-2">{product.category.name}</h3>
                                    <h3 className="font-semibold text-md truncate">
                                        {product.title.split(' ', 2).join(' ')}
                                    </h3>
                                    <div className="flex justify-between items-center mt-2 text-sm">
                                        <span className="text-gray-700 font-medium">{product.price} EGP</span>
                                        <span className="text-yellow-500 font-semibold">
                                            <i className="fas fa-star rating-color mr-1"></i>
                                            {product.ratingsAverage}
                                        </span>
                                    </div>
                                </Link>
                                <div className="flex justify-between items-center mt-auto pt-3">
                                    <div key={product.id} className="rounded shadow">
                                        <div className="flex justify-end">
                                            <i
                                                onClick={() => handleWishlistClick(product.id)}
                                                className={`fa-heart text-xl my-3 cursor-pointer transition-colors duration-300 ${
                                                wishlist[product.id] ? 'fa-solid text-red-600' : 'fa-regular text-gray-500'}`}
                                            ></i>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addProduct(product.id)}
                                        className="btn focus:ring-0 bg-main text-white hover:bg-main/90 py-2 px-3 rounded text-sm flex items-center gap-2"
                                    >
                                        <i className="fa-solid fa-cart-plus"></i> Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    )}
    </>
}
