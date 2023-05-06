import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CoinSell() {
  const location = useLocation();
  const [data, setdata] = useState();
  const [currprise, setcurrprise] = useState();

  useEffect(() => {
    let loc = location;
    setdata(loc.state.data);

    setcurrprise(
      ((`${loc.state.data.current_price}` / 100) * 70).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      })
    );
  }, []);

  console.log(currprise);
  console.log(data);

  return (
    <div className="pt-[200px] text-black">
      <div className=" w-[100px] h-[100px] ">
        <img src={data.image} alt=""></img>
      </div>
      <div>{data.name}</div>
      <div>{currprise}</div>
    </div>
  );
}
