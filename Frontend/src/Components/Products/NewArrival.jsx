import React, { useEffect, useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import axios from "axios";

const NewArrival = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNewArrivals();
    }, []);

    // Scroll Buttons
    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScroll = container.scrollLeft + container.clientWidth < container.scrollWidth - 1;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScroll);
        }
    };

    // Mouse Drag Scroll Logic
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollStart(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollStart - walk;
        updateScrollButtons();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
        }
        window.addEventListener("mouseup", handleMouseUp);
        updateScrollButtons();

        return () => {
            if (container) {
                container.removeEventListener("scroll", updateScrollButtons);
            }
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [newArrivals]);

    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>

                {/* Scroll Buttons */}
                <div className='absolute right-0 -bottom-8 space-x-2'>
                    <button onClick={() => scroll("left")} disabled={!canScrollLeft}
                        className={`p-2 rounded border bg-white ${canScrollLeft ? "text-black" : "text-gray-200"}`}>
                        <FiChevronLeft className='h-4 w-4' />
                    </button>
                    <button onClick={() => scroll("right")} disabled={!canScrollRight}
                        className={`p-2 rounded border bg-white ${canScrollRight ? "text-black" : "text-gray-200"}`}>
                        <FiChevronRight className='h-4 w-4' />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div ref={scrollRef}
                className='container mx-auto overflow-x-auto scrollbar-custom flex space-x-6 mt-4 cursor-grab active:cursor-grabbing select-none'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}>

                {newArrivals.map((product) => (
                    <div key={product._id} className="relative min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]">
                        {product.images?.[0]?.url ? (
                            <img
                                src={product.images[0].url}
                                alt={product.images[0].altText || product.name}
                                draggable="false"
                                className='w-full h-[500px] object-cover rounded-lg'
                            />
                        ) : (
                            <div className='w-full h-[500px] flex items-center justify-center bg-gray-200 rounded-lg text-gray-500'>
                                No Image Available
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                            <Link to="#" className="block">
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrival;
