import React from 'react'
import Topbar from '../Layout/Topbar'
import { Navbar } from './Navbar'

const Header = () => {
  return (
    <header className='border-b border-grey-200'>
        {/* Topbar */}
        < Topbar/ >
        {/* navbar */}
        < Navbar/ >
        {/* cartDrawer */}
    </header>
  )
}

export default Header