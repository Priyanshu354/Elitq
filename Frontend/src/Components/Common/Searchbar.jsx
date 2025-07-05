import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilter } from "../../Redux/slice/productSlie";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({search : searchTerm}));
    dispatch(fetchProductsByFilters({search : searchTerm}));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 m-0 w-full bg-white h-28 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form 
        onSubmit={handleSearch}
        className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              name="search-form"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />

            {/* {search icon} */}
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800">
                <HiMagnifyingGlass className="text-gray-700 hover:text-black h-6 w-6" />
            </button>
          </div>

          {/* {close button} */}
          <button type="button" onClick={handleSearchToggle}>
              <HiMiniXMark className="text-gray-700 hover:text-black h-6 w-6 ml-2" />
            </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="text-gray-700 hover:text-black h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
