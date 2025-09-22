import React, { createContext, useContext } from 'react'
import style from './Cart.module.css'
import Loading from '../Loading/Loading'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {

  let { cart, updateProductCart, deleteProductCart, clearCart } = useContext(CartContext);
  
  
  const handleDecrease = (productId, count) => {
    if (count > 1) {
      updateProductCart(productId, count -1);
      toast.success("Product quantity decreased.");
    } else {
      deleteProductCart(productId);
    }
  };
  
  const handleIncrease = (productId, count) => {
    updateProductCart(productId, count);
    toast.success("Product quantity increased.");
  };
  


  return <>
    {cart ? (
      <div className="px-4 py-6">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700 text-center">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.data?.products?.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50 transition text-center">
                  <td className="p-4 flex justify-center">
                    <img src={item.product.imageCover} className="w-16 h-16 object-cover rounded" alt={item.product.title} />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.product.title.split(' ' , 2).join(' ')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* زر الإنقاص */}
                      <button
                        onClick={ ()=> handleDecrease(item.product.id, item.count) }
                        className="h-9 w-9 flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 rounded-full transition focus:ring-0"
                        title="Decrease"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                      {/* الرقم */}
                      <span className="px-3 py-1 border rounded text-sm bg-gray-100 text-gray-900 min-w-[40px] text-center">
                        {item.count}
                      </span>
                      {/* زر الزيادة */}
                      <button
                        onClick={() => handleIncrease(item.product.id, item.count + 1)}
                        className="h-9 w-9 flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 rounded-full transition focus:ring-0"
                        title="Increase"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1V17M1 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price * item.count} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProductCart(item.product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition focus:ring-0"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <h3 className="text-xl font-bold">
            Total Cart Price: <span className="text-main">{cart?.data?.totalCartPrice} EGP</span>
          </h3>
          <div className="flex gap-3">
            <Link to="/checkout">
              <button className="bg-main focus:ring-0 text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
                Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="bg-red-600 focus:ring-0 text-white px-6 py-2 rounded hover:bg-red-500 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>

      </div>
    ) : (
      <Loading />
    )}
  </>
}
