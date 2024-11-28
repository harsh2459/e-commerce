import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Product = () => {

  const { id } = useParams();
  const [letestProducts, setLatestProducts] = useState([]);
  const { addtocart } = useContext(ShopContext);
  const { img, side_img_1, side_img_2, price, description, category, name, _id } = letestProducts

    
    useEffect(() => {
      const fetchLatestProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/single_product/${id}`);
          setLatestProducts(response.data.data);
        } catch (error) {
          console.error("Error fetching the latest products:", error); // Handle any errors
        }
      };

      fetchLatestProducts(); // Call the fetch function
    },);
    return (
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>  {/* -------- Product Row ---------- */}

          {/* -------- Product Images ---------- */}

          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[100%] w-full'>

              <Link className='text-gray-700 cursor-pointer'>

                <div className=' '>
                  <img className='' src={img} alt="" />
                </div>
              </Link>

            </div>
          </div>

          {/* -------- Product Info ---------- */}

          <div className='flex-1'>

            <h1 className='font-medium text-2xl mt-2'>{name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img className='w-3.5' src={side_img_1} alt="" />
              <img className='w-3.5' src={side_img_2} alt="" />

              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{description}</p>
            <div className='flex flex-col gap-4 my-8'>

            </div>
            <button onClick={() => addtocart(_id)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>

            <hr className='mt-8 sm:w-4/5' />

            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>


        </div>

        <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>
        </div>
      </div>
    )
  }

  export default Product