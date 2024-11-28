import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestCollection = () => {
    const [letestProducts, setLatestProducts] = useState([]);


    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/view_product');
                setLatestProducts(response.data.data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching the latest products:", error); // Handle any errors
            }
        };

        fetchLatestProducts(); // Call the fetch function
    },);
    


    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
            </div>

            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    letestProducts.map((item, index) => (
                        <Link to={`/product/${item._id}`} onClick={() => window.scrollTo(0, 0)} className='text-gray-700 cursor-pointer'>

                            <div className=' overflow-hidden'>
                                <img className='hover:scale-110 transition ease-in-out' src={item.img} alt="" />
                            </div>

                            <p className='pt-3 pb-1 text-sm'>{item.name}</p>
                            <p className='text-sm font-medium'>{item.price}</p>

                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default LatestCollection;