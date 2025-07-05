import React from 'react'
import { Link } from 'react-router-dom'

const MobileNav = ({ navDrawerOpne, handlenavDrawerOpne }) => {
  return (
    <div
      className={`fixed top-[117px] left-0 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50
      w-auto p-6 text-start text-sm font-semibold md:hidden ${navDrawerOpne ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col md:hidden space-y-6">
        <Link onClick={handlenavDrawerOpne} to="/collections/all/?gender=Men" className="text-gray-700 hover:text-black text-sm font-normal">MEN</Link>
        <Link onClick={handlenavDrawerOpne} to="/collections/all/?gender=Women" className="text-gray-700 hover:text-black text-sm font-normal">WOMEN</Link>
        <Link onClick={handlenavDrawerOpne} to="/collections/all/?category=Top+Wear" className="text-gray-700 hover:text-black text-sm font-normal">TOP WEAR</Link>
        <Link onClick={handlenavDrawerOpne} to="/collections/all/?category=Bottom+Wear" className="text-gray-700 hover:text-black text-sm font-normal">BOTTOM WEAR</Link>
      </div>
    </div>
  )
}

export default MobileNav
