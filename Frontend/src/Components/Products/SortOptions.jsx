import React from 'react'
import {useSearchParams} from "react-router-dom"

export const SortOptions = () => {
  const [searchParams, SetSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    SetSearchParams(searchParams);
  };

  return (
    <div className='mb-4 flex items-center justify-end'>
      <select id="sort"
        onChange={handleSortChange}
        value = {searchParams.get("sortBy") || ""}
        className='border p-2 rounded-md focus:outline-none'
        >
        <option value="Default"> Default </option>
        <option value="priceAsc"> Sort : Low to High </option>
        <option value="priceDsc"> Sort : High to Low </option>
        <option value="Popularity"> Popularity </option>
      </select>
    </div>
  )
}
