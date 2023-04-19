import React from "react";
import Footer from "./Footer";
import List from "./List";
import Nav from "./Nav";
import LoginModal from "./LoginModal";
import { useState } from "react";
import Signup from "./Signup";
import { Link } from "react-router-dom";

export default function Home() {
 

  //   const openmodal= ()=>{

  //      setOpen(true);

  //  }

  return (
    <div>
      

      <div className="w-[100%] bg-gray-500 h-screen ">
        <h1 className="text-white px-[700px] py-[300px]">hponesoic;nskj</h1>
        <Link to="/market">market</Link>
      </div>
      <List  />
      <Footer />
      <Footer />
    </div>
  );
}
