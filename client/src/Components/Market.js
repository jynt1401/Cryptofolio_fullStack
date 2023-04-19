import React from "react";
import Nav from "./Nav";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Market() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true";
  const [info, setinfo] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setinfo(response.data);
    });
  }, []);

  const getFilteredItem = (query, item) => {
    if (!query) {
      return item;
    }
    
    return item.filter((val) =>{ return ( ((val.name).toLowerCase()).indexOf(query.toLowerCase()) > -1);})
  };

  const [Query, setQuery] = useState("");
  console.log(Query);
  const filtered = getFilteredItem(Query, info);
  
  console.log(filtered);

  return (
    <div>
      
      <h1>buy crypto</h1>

      <div>
        <div>
          <input
            id="searchInput"
            type="text"
            placeholder="Search crypto here"
            // value={Query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <div>
          {filtered.map((value, key) => {
            return (
              <div>
                <Link
                  to={{
                    pathname: "/coin",
                    hash: `${value.name}`,
                  }}
                  state={{ name: `${value.name}`, Symbol: `${value.symbol}` }}
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
          })}
        </div>
      </div>
    </div>
  );
}
