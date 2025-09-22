import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export let WishListContext = createContext();

export default function WishListContextProvider({children}) {
    const headers = {
        token: localStorage.getItem('token')
};

    const [WishList, setWishList] = useState([]);

    async function addWishlist(productId) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ productId },{ headers });
        getProductWishLists()
        toast.success(data.message)
    }

    async function deleteProductWishList(productId) {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ productId }`,{ headers });
        getProductWishLists()
        toast.error("Product Removed from wishlist.");
    }
    async function getProductWishLists() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/WishList`, { headers });
        setWishList(data.data)
    }

    useEffect(() => {
        getProductWishLists();
    } , [])

    return <WishListContext.Provider value={ { addWishlist , deleteProductWishList , WishList, setWishList , getProductWishLists } }>
        {children}
    </WishListContext.Provider>
}