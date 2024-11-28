import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Collection = () => {
  const [letestProducts, setLatestProducts] = useState([]);


  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/view_product');
        setLatestProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching the latest products:", error); // Handle any errors
      }
    };

    fetchLatestProducts(); // Call the fetch function
  },);


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      {/* <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS<img className={`h-3 sm:hidden ${showFilter ? ' rotate-90' : ''}`} src={assets.dropdown_icon} alt="" /></p>

        
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'><input className='w-3' value={"Men"} onChange={toggleCategory} type="checkbox" /> Men </p>
            <p className='flex gap-2'><input className='w-3' value={"Women"} onChange={toggleCategory} type="checkbox" /> Women </p>
            <p className='flex gap-2'><input className='w-3' value={"Kids"} onChange={toggleCategory} type="checkbox" /> Kids </p>
          </div>
        </div>

        
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'><input className='w-3' value={"Topwear"} onChange={toggleSubCategory} type="checkbox" /> Topwear </p>
            <p className='flex gap-2'><input className='w-3' value={"Bottomwear"} onChange={toggleSubCategory} type="checkbox" /> Bottomwear </p>
            <p className='flex gap-2'><input className='w-3' value={"Winterwear"} onChange={toggleSubCategory} type="checkbox" /> Winterwear </p>
          </div>

        </div>
      </div> */}

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select className='border-2 border-gray-300 text-sm px-2' name="" id="">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
                    letestProducts.map((item, index) => (
                        <Link  to={`/product/${item._id}`} className='text-gray-700 cursor-pointer'>

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
    </div>
  )
}

export default Collection
