import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CiUser, CiMenuBurger } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import Searchbar from './Searchbar';
import CartDrawer from '../Layout/CartDrawer';
import MobileNav from '../Layout/MobileNav';
import { HiMiniXMark } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Navbar = () => {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [navDrawerOpne, setnavDrawerOpne] = useState(false);
    const navigate = useNavigate();


    const {user} = useSelector((state)=>state.auth);
    const {cart} = useSelector((state)=>state.cart);
    const cartItemCount = cart?.products?.reduce((total, product) => {return total + product.quantity}, 0);

    const handleCartDrawerOpen = () => {
        if(!cartDrawerOpen){
            setnavDrawerOpne(false);
        }
        setCartDrawerOpen(!cartDrawerOpen);
    };

    const handlenavDrawerOpne = () => {
        setnavDrawerOpne(!navDrawerOpne);
    };

    const handleAdmin = () => {
        navigate('/Admin');
    }

    const handleProfile = () => {
        if (!user) {
            navigate("/login?redirect=/profile");
        } else {
            navigate("/profile");
        }
    };

    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div>
                    <Link to="/" className="text-2xl font-medium">Elitiq</Link>
                </div>

                {/* Center NavLinks */}
                <div>
                    <div className="hidden md:flex space-x-6">
                    <NavLink
                        to="/collections/all/?gender=Men"
                        className={({ isActive }) =>
                            isActive
                            ? "text-black text-sm font-normal"
                            : "text-gray-700 hover:text-black text-sm font-normal"
                        }
                        >
                        MEN
                    </NavLink>

                    <NavLink
                        to="/collections/all/?gender=Women"
                        className={({ isActive }) =>
                            isActive
                            ? "text-black text-sm font-normal"
                            : "text-gray-700 hover:text-black text-sm font-normal"
                        }
                        >
                        WOMEN
                    </NavLink>


                    <NavLink
                        to="/collections/all/?category=Top+Wear"
                        className={({ isActive }) =>
                            isActive
                            ? "text-black text-sm font-normal"
                            : "text-gray-700 hover:text-black text-sm font-normal"
                        }
                        >
                        TOP WEAR
                    </NavLink>


                    <NavLink
                        to="/collections/all/?category=Bottom+Wear"
                        className={({ isActive }) =>
                            isActive
                            ? "text-black text-sm font-normal"
                            : "text-gray-700 hover:text-black text-sm font-normal"
                        }
                        >
                        BOTTOM WEAR
                    </NavLink>
                    </div>
                </div>



                {/* Right NavLinks */}
                <div className='flex space-x-4 items-center'>
                    { (user?.role === "admin" ? 
                        <button onClick={handleAdmin}
                        className='bg-gray-900 text-white font-semibold text-sm p-2 rounded-md'> Admin </button>
                        :
                        <></>
                        )
                    }
                    <div onClick={handleProfile} className="flex items-center cursor-pointer">
                        <CiUser className="text-gray-700 hover:text-black h-6 w-6" />
                    </div>

                    <a href="#" onClick={handleCartDrawerOpen} className="flex items-center relative">
                        <IoBagOutline className="text-gray-700 hover:text-black h-6 w-6" />
                        <span className='absolute bg-red-600 text-white text-xs rounded-full px-1 py-0.5 top-0 right-0'>{cartItemCount}</span>
                    </a>

                    {/* Search Bar */}
                    <div className="overflow-hidden">
                        <Searchbar />
                    </div>

                    {/* Mobile Navbar */}
                    <div className='flex md:hidden'>
                        {!navDrawerOpne ?
                        <CiMenuBurger onClick={handlenavDrawerOpne}
                        className='text-gray-700 h-6 w-6' />
                        :
                        <HiMiniXMark onClick={handlenavDrawerOpne}
                        className='text-gray-700 h-6 w-6'/> }
                    </div>
                </div>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer cartDrawerOpen={cartDrawerOpen} handleCartDrawerOpen={handleCartDrawerOpen} />


            {/* Mobile Navigation */}
            <MobileNav navDrawerOpne={navDrawerOpne} handlenavDrawerOpne={handlenavDrawerOpne}/>
        </>
    );
};
