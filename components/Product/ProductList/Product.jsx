import React from "react";
import Header from "../../Layout/Header";
import Navbar from "../../Layout/Navbar";
import ProductListing from "./Productlist";

const Product = () => {
  return (
    <div className="relative w-full h-screen bg-[#F9F9F9] overflow-hidden">
      <Header />
      <div className="flex w-full h-full">
        <div className="hidden md:block w-[240px] bg-white border-r h-full">
          <Navbar />
        </div>
        <div className="block md:hidden w-full">
          <Navbar />
        </div>
        <div className="flex-1 p-6 relative z-0 overflow-y-auto ">
          <ProductListing />
        </div>
      </div>
    </div>
  );
};

export default Product;
