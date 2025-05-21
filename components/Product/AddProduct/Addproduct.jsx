import React from 'react'
import Header from '../../Layout/Header'
import Navbar from '../../Layout/Navbar'
import Addproductdetails from './Addproductdetails'

const Addproduct = () => {
  return (
    <div>
      <div className="relative w-full h-screen bg-[#F9F9F9] overflow-hidden">
        <Header />
        <div className="flex w-full h-full">
          <div className="hidden md:block w-[240px] bg-white border-r h-full">
            <Navbar />
          </div>
          <div className="block md:hidden w-full">
            <Navbar />
          </div>
          <div className="flex-1 mt-3 p-6 relative z-0  overflow-y-auto">
            <Addproductdetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproduct
