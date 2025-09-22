import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import style from './Categories.module.css'
import { useNavigate } from 'react-router-dom';

export default function Categories() {

    const [categorys, setcCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    async function getProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        console.log(data.data);
        setcCategory(data.data);
        setLoading(false);
        
    }

    useEffect(() => {
        getProduct();
    },[])
    const handleCategoriesClick = (id) => {
        navigate(`/categories/${id}`);
    }

return <>
    {loading ? ( <Loading /> ) : (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-semibold text-center mb-8">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categorys.map((category) => (
                    <div
                        key={category._id}
                        onClick={() => handleCategoriesClick(category._id)}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-48 object-cover object-top"
                        />
                            <div className="p-3">
                                <h3 className="text-center text-lg font-semibold text-gray-800">
                                    {category.name}
                                </h3>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    )}
    </>
}
