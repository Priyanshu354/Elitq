import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

export const FilterSideBar = () => {
    const [searchParams, SetSearchParams] = useSearchParams("");
    const nevigate = useNavigate();

    const [filter, SetFilters] = useState({
        category : "",
        gender : "",
        colors : [],
        sizes : [],
        materials : [],
        brands : [],
        minPrice : 0,
        maxPrice : 100,
    });

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
    
        SetFilters({
            category: params.category || "",
            gender: params.gender || "",
            colors: params.colors ? params.colors.split(",") : [],
            sizes: params.sizes ? params.sizes.split(",") : [],
            materials: params.materials ? params.materials.split(",") : [],
            brands: params.brands ? params.brands.split(",") : [],
            minPrice: params.minPrice ? Number(params.minPrice) : 0,
            maxPrice: params.maxPrice ? Number(params.maxPrice) : 100
        });
    
        SetPriceRange([0, params.maxPrice ? Number(params.maxPrice) : 100]);
    
    }, [searchParams]);
    

    const [priceRange, SetPriceRange] = useState([0,100]);
    const categories = ["Top Wear", "Bottom Wear"];
    const colors = [
        "Red", "Blue", "Green", "Yellow", "Orange", 
        "Purple", "Pink", "Brown", "Black", "White",
        "Gray", "Cyan", "Magenta", "Lime", "Teal", 
        "Indigo", "Violet", "Gold", "Silver", "Maroon"
    ];

    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL"];

    const materials = [
        "Cotton", "Polyester", "Wool", "Silk", "Denim",  
        "Linen", "Leather", "Rayon", "Nylon", "Velvet",  
        "Satin", "Spandex", "Chiffon", "Suede", "Acrylic"
    ];

    const brands = [
        "Nike", "Adidas", "Puma", "Reebok", "Under Armour",  
        "Zara", "H&M", "Levi's", "Gucci", "Prada",  
        "Versace", "Tommy Hilfiger", "Louis Vuitton", "Balenciaga", "Burberry"
    ];

    const genders = ["Men", "Women"];

    const handleFilterChange = (e) => {
        const {name, value, checked, type} = e.target;

        const newFilter = {...filter};
        
        if(type === "checkbox"){
            if(checked){
                newFilter[name] = [...(newFilter[name] || []), value];
            }
            else{
                newFilter[name] = newFilter[name].filter((item) => item !== value);
            }
        }
        else{
            newFilter[name] = value;
        }

        SetFilters(newFilter);
        //console.log(newFilter);
        updateURLParams(newFilter);
    };

    const handleColorChange = (color) => {
        const newFilter = { ...filter };
    
        if (newFilter.colors.includes(color)) {
            newFilter.colors = newFilter.colors.filter((c) => c !== color);
        } else {
            newFilter.colors = [...newFilter.colors, color];
        }
    
        SetFilters(newFilter);
        //console.log(newFilter);
        updateURLParams(newFilter);
    };

    const updateURLParams = (newfilter) => {
        const params = new URLSearchParams();
    
        Object.keys(newfilter).forEach((key) => {
            if (Array.isArray(newfilter[key]) && newfilter[key].length > 0) {
                params.set(key, newfilter[key].join(","));
            } else if (newfilter[key]) { 
                params.set(key, newfilter[key]);
            }
        });
    
        SetSearchParams(params); 
        nevigate(`?${params.toString()}`);
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        SetPriceRange([0, newPrice]);
        const newFilter = {...filter, minPrice:0, maxPrice:newPrice};
        SetFilters(newFilter);
        updateURLParams(newFilter);
    }
    
  return (
    <div className='p-4'>
        <h2 className='text-xl'> Filter </h2>

        {/* Category */}
        <div className="mt-5">
            <h2 className="text-lg mb-1"> Category </h2>
            {categories.map((category, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700 hover:cursor-pointer">
                    <input
                    onChange={handleFilterChange}
                    checked={filter.category === category}
                    type="radio" name="category" value={category} className="mr-2" />
                    {category}
                </label>
            ))}
        </div>

        {/* Gender */}
        <div className="mt-5">
            <h2 className="text-lg mb-1"> Gender </h2>
            {genders.map((gender, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700">
                    <input 
                    onChange={handleFilterChange}
                    checked={filter.gender === gender}
                    type="radio" name="gender" value={gender} className="mr-2" />
                    {gender}
                </label>
            ))}
        </div>


        {/* Colors */}
        <div className="mt-5">
            <h2 className="text-lg mb-1"> Color </h2>
            <div className='flex flex-wrap gap-2'>
                {colors.map((color) => (
                    <button key={color} 
                    name='color'
                    onClick={() => handleColorChange(color)}
                    className={`h-8 w-8 rounded-full border-gray-300 cursor-pointer transition hover:scale-105 
                        ${filter.colors.includes(color) ? "ring-2 ring-gray-700" : "" }`}
                    style={{backgroundColor : color.toLowerCase()}}
                    ></button>
                ))}
            </div>
            
        </div>

        {/* Sizes */}
        <div className="mt-5">
            <h2 className="text-lg mb-1"> Size </h2>
            {sizes.map((size, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700">
                    <input
                    onChange={handleFilterChange}
                    checked={filter.sizes.includes(size)}
                    type="checkbox" name="sizes" value={size} className="mr-2" />
                    {size}
                </label>
            ))}
        </div>

        {/* Materials */}
        <div className="mt-5">
            <h2 className="text-lg mb-1"> Material </h2>
            {materials.map((material, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700">
                    <input
                    onChange={handleFilterChange}
                    checked={filter.materials.includes(material)}
                    type="checkbox" name="materials" value={material} className="mr-2" />
                    {material}
                </label>
            ))}
        </div>

        {/* Brands */}
        <div className="mt-5">
            <h2 className="text-lg mb-1"> Brand </h2>
            {brands.map((brand, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700">
                    <input 
                    onChange={handleFilterChange}
                    checked={filter.brands.includes(brand)}
                    type="checkbox" name="brands" value={brand} className="mr-2" />
                    {brand}
                </label>
            ))}
        </div>

        {/* Price Range */}
        <div className='mt-5'>
            <h2 className='text-lg mb-1'> Price Range </h2>
            <label className='flex flex-col text-gray-700'>
                <input 
                    onChange={handlePriceChange}
                    type="range" 
                    name='range'
                    className='text-gray-700'
                    value={priceRange[1]} 
                    min="0" 
                    max="100"
                />
                <div className='flex justify-between'>
                    <span> 0$ </span>
                    <span> {priceRange[1]}$ </span> {/* Display the selected price */}
                </div>
            </label>
        </div>
    </div>
  )
}
