import React from 'react'
import featuredImage from "../../assets/featured.webp";
import { Link } from 'react-router-dom';
const FeatureCollection = () => {
  return (
    <div className='containet mx-auto mt-11 flex justify-center items-center bg-green-100 flex-col md:flex-row'>
        {/* Brand Details */}
        <div className='hidden md:flex lg:w-1/2 h-full px-8 flex-col gap-8'>
            <p className='text-md font-bold text-black'> Comfort & style </p>
            <h1 className='text-black text-4xl font-extrabold'> Apparel made for your everyday life </h1>
            <p className='text-sm text-gray-700'>Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.</p>
            <div>
                <Link to="/collections/all" className='bg-black text-white rounded-lg px-8 py-3 text-2lg font-semibold '> Shop Now</Link>
            </div>
            
        </div>

        <div className='lg:w-1/2'>
            <img src={featuredImage} alt="Featured" />
        </div>

        {/* Mobile View */}
        <div className='flex md:hidden h-full flex-col justify-center items-center gap-8 px-5 py-10'>
            <p className='text-md font-bold text-black'> Comfort & style </p>
            <h1 className='text-black text-4xl font-extrabold'> Apparel made for your everyday life </h1>
            <p className='text-sm text-gray-700'>Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.</p>
            <div>
                <Link to="/collections/all" className='bg-black text-white rounded-lg px-8 py-3 text-2lg font-semibold '> Shop Now</Link>
            </div>
            
        </div>
    </div>
  )
}

export default FeatureCollection