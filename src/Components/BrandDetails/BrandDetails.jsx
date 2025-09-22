// BrandDetails.jsx (تفاصيل براند معين)
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function BrandDetails() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function getBrandDetails() {
          try {
              const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
              setBrand(data.data);
          } catch (error) {
              console.error("Error fetching brand details", error);
          } finally {
              setLoading(false);
          }
      }
      getBrandDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!brand) return <p className='text-center text-red-500'>Brand not found</p>;

  return <>
    <div className='py-10 max-w-5xl mx-auto'>
      <div className='flex flex-col md:flex-row items-center md:items-stretch gap-6 h-full'>
        {/* Image on the left */}
        <div className='md:w-1/2 w-full flex justify-center items-center'>
          <img src={brand.image} alt={brand.name} className='h-52 object-contain' />
        </div>

        {/* Text on the right */}
        <div className='md:w-1/2 w-full flex items-center justify-center'>
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-bold text-main mb-4'>{brand.name}</h2>
            <p className='text-gray-700'>
              This brand offers high-quality products trusted by many customers. Explore a wide range of items that blend innovation and reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
}
