import React, { useEffect, useState } from "react";

export default function ModalTransactions({ fun }) {
  console.log(fun.data);

  return (
    <div className="w-[100%] fixed top-0 h-full snap-none z-50  bg-[#131722c3]">
      <button className="text-[50px] text-white"
        onClick={() => {
          fun.open(false);
        }}
      >
        x
      </button>
      <div className="border-2 w-[60%] mx-auto text-black bg-white">
        <div>
          {fun.data.img}
        </div>
        <div>
          {fun.data.Amount}
        </div>
        <div>
          {fun.data.CoinID}
        </div>
        <div>
          {fun.data.CoinName}
        </div>
        <div>
          {fun.data.Date}
        </div>
        <div>
          {fun.data.Prise}
        </div>
        <div>
          {fun.data.Quantity}
        </div>
      </div>
    </div>
  );
}
