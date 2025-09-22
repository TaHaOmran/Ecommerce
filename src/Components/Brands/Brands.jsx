import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import style from './Brands.module.css'
import { useNavigate } from 'react-router-dom';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    async function getProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        console.log(data.data);
        setBrands(data.data);
        setLoading(false);
        
    }

    useEffect(() => {
        getProduct();
    },[])

    const handleBrandClick = (id) => {
        navigate(`/brands/${id}`);
    }
    
    return <>
        {loading ? <Loading /> : (
            <div className="py-8">
                <h2 className='text-center text-2xl font-semibold mb-8'>All Brands</h2>
            
                <div className='flex flex-wrap gap-6 justify-center'>
                    {brands.map((brand) => (
                        <div 
                            key={brand._id} 
                            onClick={() => handleBrandClick(brand._id)}
                            className='w-1/4 p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300'
                        >
                            <div className="bg-white rounded-lg overflow-hidden text-center border p-4">
                                <img src={brand.image} alt={brand.name} className='w-full h-32 object-contain mb-2' />
                                <h3 className='text-lg font-semibold'>{brand.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
</>
}
