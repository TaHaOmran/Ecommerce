import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategoryDetails() {
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        setCategory(data.data);
      } catch (error) {
        console.error("Error fetching category details", error);
      } finally {
        setLoading(false);
      }
    }
    getCategoryDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!category) return <p className='text-center text-red-500'>Category not found</p>;

  return (
    <div className='py-10 max-w-5xl mx-auto'>
      <div className='flex flex-col md:flex-row items-center md:items-stretch gap-6 h-full'>
        {/* Image on the left */}
        <div className='md:w-1/2 w-full flex justify-center items-center'>
          <img src={category.image} alt={category.name} className='h-52 object-contain' />
        </div>

        {/* Text on the right */}
        <div className='md:w-1/2 w-full flex items-center justify-center'>
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-bold text-main mb-4'>{category.name}</h2>
            <p className='text-gray-700'>
              Discover a variety of products in the {category.name} category. We provide quality and trusted items for all your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
