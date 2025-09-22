import React, { useContext } from 'react'
// import { WishlistContext } from '../../context/WishlistContext';
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

import style from './WishList.module.css'
import { WishListContext } from '../../context/WishListContext';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function WishList() {
  let { addWishlist , deleteProductWishList , WishList, setWishList , getProductWishLists } = useContext(WishListContext);
  let { addProduct } = useContext(CartContext);

  const handleDelete = async (productId) => {
    await deleteProductWishList(productId); // بتكلم الـ API
    setWishList(prev => prev.filter(item => item.id !== productId));// بتشيل العنصر من القائمة
  };

  return <>
    <h3 className="text-center text-2xl font-semibold mb-6">My Wishlist</h3>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="bg-gray-200 text-gray-700 uppercase text-xs text-center">
          <tr>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {WishList?.length > 0 && WishList?.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50 transition duration-200 text-center"
            >
              <td className="p-4 flex justify-center">
                <div className="w-20 h-20 rounded overflow-hidden shadow-sm ">
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {item.title.split(' ' , 2).join(' ')}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {item.price} EGP
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-md transition focus:ring-0"
                >
                  Remove
                </button>
                <button
                  onClick={() => addProduct(item.id)}
                  className="px-4 py-2 text-sm text-white bg-main hover:bg-main/90 rounded-md transition focus:ring-0"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
}