import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Card() {

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true";
  const [info, setinfo] = useState([]);

  useEffect(() => {
    
    axios.get(url).then((response) => {
      setinfo(response.data);
    });
  }, []);
  // console.log(open2[0])
  // console.log(open2[1])

  return (
    <div>
      <h1>coins vlaue</h1>
      <div>
        {info.map((value, key) => {
          
          if (key < 6) {
            return (
              <div>
                <Link
                  to={{
                    pathname: "/coin",
                    hash: `${value.name}`,
                  }}
                  state={{value }}
                >
                  <div className="border-2 m-3 w-[200px]">
                    <div className="w-[100px] h-[100px] ">
                      <img src={value.image} alt=""></img>
                    </div>
                    <h3>NAME-{value.name}</h3>
                    <p>VALUE-{value.current_price}</p>
                    <h3>UP-{value.high_24h}</h3>
                    <h3>DOWN-{value.low_24h}</h3>
                  </div>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
