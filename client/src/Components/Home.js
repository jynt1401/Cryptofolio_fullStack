import React from "react";
import Footer from "./Footer";
import List from "./List";
import { Link } from "react-router-dom";
import Typed from 'react-typed'

export default function Home() {
  //   const openmodal= ()=>{

  //      setOpen(true);

  //  }

  return (
    <div>
      <div className="w-screen bg-[#2b2b2b]  h-full ">
        <div className="text-white mx-auto text-center  w-[100%]  pt-[150px] sm:pt-[170px] md:pt-[200px] xl:pt-[250px] py-[20%]">
          <div className=" text-[10px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[26px]">Invest with Confidence</div>
          <div className="flex justify-around">
            <div className="font-bold text-[25px] sm:text-[35px] md:text-[45px] lg:text-[55px] xl:text-[65px] text-[#f3d56a]">Grow With CryptoFolio </div>
          </div>
          {/* <div className="flex justify-center">
            <p className='textwhite text-base md:text-xl lg:text-3xl'>we are   </p>
           
                <Typed className='textwhite text-base md:text-xl lg:text-3xl ml-2'
                strings={['Simple','Secure','innovative']}
                typeSpeed={50}
                backSpeed={40}
                loop/>
          </div> */}
          <div className=" text-[10px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[26px]"> Trade with confidence in the world of crypto</div>
        </div>
        <Link to="/market" className="text-white">market</Link>
      </div>
      <List />
      <Footer />
      
    </div>
  );
}
