import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdPersonalVideo, MdEmail } from "react-icons/md";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <>
    <div className="relative mb-6 flex items-center">
        <div className="flex-grow border-t border-gray-150"></div>
    </div>

    <footer className='container px-10 py-10 grid grid-cols-1 md:grid-cols-5 mt-6 gap-8 justify-center grid-flow-dense'>
        {/* Newsletter */}
        <div className='flex flex-col gap-6 sm:col-span-2'>
            <div> 
                <h3 className='text-ms font-semibold'>Newsletter</h3> 
            </div>
            <div>
                <p className='text-sm text-gray-700'>
                    Be the first to hear about new products, 
                    exclusive events, and online offers.
                </p>
            </div>
            <div>
                <h3 className='text-sm'>SignUp & get 10% off on Your first Order.</h3>
            </div>
            <form className="flex gap-x-0.5 w-auto pr-10">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="border border-black p-2 w-full text-sm "
                />
                <button 
                    className="bg-black px-4 py-2 text-white rounded-sm whitespace-nowrap text-sm"
                >
                    Subscribe
                </button>
            </form>
        </div>

        {/* Shop Links */}
        <div className='flex flex-col gap-6 md:px-6'>
            <div>
                <h3 className='text-ms font-semibold text-black'>Shop</h3>
            </div>

            <div className='flex flex-col gap-4'>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">Men's Top Wear</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">Women's Top Wear</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">Men's Bottom Wear</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">Women's Bottom Wear</Link>
            </div>

        </div>

        {/* Support */}
        <div className='flex flex-col gap-4 md:px-6'>
            <h3 className='text-ms font-semibold text-black'>Support</h3>

            <div className='flex flex-col gap-4'>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">Contact Us</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">About Us</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">FAQ's</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-normal">Features</Link>
            </div>

        </div>

        {/* Social Links */}
        <div className='flex flex-col gap-y-3 md:px-6'>
            <h3 className='text-ms font-semibold'>Follow Me</h3>

            <div className="flex gap-2 lg:gap-3">
                <a href="https://www.linkedin.com/in/priyanshu-raj-96314525a/" className="hover:text-gray-300">
                <FaLinkedin className="h-5 w-5" />
                </a>

                <a href="https://github.com/Priyanshu354" className="hover:text-gray-300">
                <FaGithub className="h-5 w-5" />
                </a>

            </div>

            <h3 className='text-sm font-semibold text-black mt-6'>Contact Me</h3>
            <div>
                <a href="mailto:titpriyanshuraj@gmail.com" className="hover:text-gray-300 flex gap-3 text-gray-700">
                <CiMail className='h-5 w-5'/>
                </a>
            </div>
        </div>
    </footer>
    </>
    
  )
}

export default Footer
