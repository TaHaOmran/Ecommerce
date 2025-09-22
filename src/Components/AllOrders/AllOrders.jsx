import React, { useContext, useEffect } from 'react'
import style from './AllOrders.module.css'
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import Loading from '../Loading/Loading';

export default function AllOrders() {
  let { cart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getOrders() {
    try {
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).id;

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        {
          headers: {
            token,
          },
        }
      );

      setOrders(data);
      console.log(data);
      
      
      
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString();
  }
  

  return <>
      <div className="p-6 max-w-5xl mx-auto">
  <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">🧾 Your Orders</h2>

  {loading ? (
    <Loading />
  ) : orders?.length === 0 ? (
    <p className="text-center text-gray-400">You have no orders yet.</p>
  ) : (
    <div className="space-y-8">
      {[...orders].reverse().map((order, index) => {
        const shipping = order.shippingAddress || {};

        return (
          <div
            key={order._id}
            className="p-6 rounded-2xl border border-gray-100 bg-white shadow-md hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300 ease-in-out animate-fade-in"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                📦 Order #{order.id}
              </h3>
              <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
              <div>
                <strong>💳 Payment:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>{" "}
                <span className="ml-1 text-gray-500">({order.paymentMethodType})</span>
              </div>

              <div>
                <strong>🚚 Delivered:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    order.isDelivered
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>

              <div>
                <strong>💰 Total:</strong>{" "}
                <span className="text-gray-800 font-medium">{order.totalOrderPrice} EGP</span>
              </div>
            </div>
            {/* Divider */}
            <hr className="my-4 border-dashed" />
            {/* Products */}
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">🛍 Products:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {order.cartItems.map((item, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{item.product.title}</span>{" "}
                    <span className="text-gray-500">× {item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>


    </>
  
}