import React from "react";
import { useEffect, useState } from "react";


export default function ProfileImage({ img }) {
    useEffect(() => {
        
    }, [img]);
  return (
    <div>
      <div
        className="w-[200px] h-[200px] m-auto  bg-cover"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
       {!img && <div>Loadingfhjsbf;bahs;bhv;sbvbkab...</div>}
    </div>
  );
}
