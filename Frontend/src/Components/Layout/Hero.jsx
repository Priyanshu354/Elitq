import React from 'react'
import rabbitHero from "../../assets/rabbit-hero.webp";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative'>
        <img src={rabbitHero} alt="Elitiq" 
        className='w-full h-[400px] md:h-[600px] lg-h[750px] object-cover'
        />

        <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center flex-col'>
            <div className='text-center text-white p-6'>
                <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'> Vacation <br /> Ready </h1>
            </div>

            <p className='text-sm tracking-tighter md:text-lg mb-6 text-white text-center'>
                Explore our Vacation-ready outfits with fast worldwide shipping.
            </p>

            <Link to="/collections/all" className='bg-white text-black rounded-md px-4 py-2'>Shop Now</Link>
        </div>
    </section>
  )
}

export default Hero