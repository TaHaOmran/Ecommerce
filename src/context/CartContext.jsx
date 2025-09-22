import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";



export let CartContext = createContext();

export default function CartContextProvider({children}) {
    const headers = {
        token: localStorage.getItem('token')
};

    const [cart, setCart] = useState(null);

    async function addProduct(productId) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{ productId },{ headers });
        getProductCarts()
        toast.success(data.message)
    }
    async function updateProductCart(productId, count) {
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }` ,{count},{ headers });
        getProductCarts()
    }
    async function deleteProductCart(productId) {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }`,{ headers });
        getProductCarts()
        toast.error("Product Removed from Cart.");
    }
    async function clearCart() {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{ headers });
        getProductCarts();
        if (location.pathname === "/cart") {
            toast.error("All Products have been cleared successfully!");
        }
    }
    async function getProductCarts() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
        setCart(data)
    }

    useEffect(() => {
        getProductCarts();
    } , [])

    return <CartContext.Provider value={ { addProduct, cart , updateProductCart , deleteProductCart , clearCart } }>
        {children}
    </CartContext.Provider>
}