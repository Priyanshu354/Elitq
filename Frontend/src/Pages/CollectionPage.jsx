import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FilterSideBar } from "../Components/Products/FilterSideBar";
import { SortOptions } from "../Components/Products/SortOptions";
import ProductGrid from "../Components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../Redux/slice/productSlie";

export const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {products , loading, error} = useSelector((state)=>state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const [filterSideBar, setFilterSideBar] = useState(false);
    const sidebarRef = useRef(null);



    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }))
    }, [dispatch, collection, searchParams]);

    const handleFilterSideBarToggle = () => {
        setFilterSideBar(!filterSideBar);
    };

    // Step 2: Detect click outside and close sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            //console.log(sidebarRef.current);
            //console.log(event.target);
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setFilterSideBar(false); // Close sidebar
            }
        };

        if (filterSideBar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterSideBar]);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile Filter Button */}
            <button
                onClick={handleFilterSideBarToggle}
                className="lg:hidden flex justify-center items-center border p-2"
            >
                <FaFilter /> <h2 className="text-sm font-semibold ml-2">Filter</h2>
            </button>

            {/* FilterSideBar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 w-1/2 h-full bg-white z-50
                overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-64
                ${filterSideBar ? "translate-x-0" : "-translate-x-full"}`}>
                <FilterSideBar />
            </div>


            <div className="flex-grow p-4">
                <h2 className="text-2xl mb-4">ALL COLLECTION</h2>

                {/* Sort Options */}
                <SortOptions/>

                {/* Product Grid */}
                <ProductGrid products={products} loading={loading} error={error}/>
            </div>
        </div>
    );
};
