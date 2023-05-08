import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CoinInfo({ state }) {
  const navigate = useNavigate();
  const data = state.value;
  console.log(data);
  const [Coindata, setCoindata] = useState({});
  const [currencyRupee, setcurrencyRupee] = useState(true);

  useEffect(() => {
    if (currencyRupee === true) {
      setCoindata({
        current_price: ((`${data.current_price}` / 100) * 70).toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          }
        ),
        high: ((`${data.high_24h}` / 100) * 70).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
        low: ((`${data.low_24h}` / 100) * 70).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
        priceChange: ((`${data.price_change_24h}` / 100) * 70).toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          }
        ),
        pricePercentageChange: `${data.price_change_percentage_24h}`,
      });
    } else {
      setCoindata({
        current_price: (`${data.current_price}` / 100).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "USD",
        }),
        high: (`${data.high_24h}` / 100).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "USD",
        }),
        low: (`${data.low_24h}` / 100).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "USD",
        }),
        priceChange: (`${data.price_change_24h}` / 100).toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "USD",
          }
        ),
        pricePercentageChange: `${data.price_change_percentage_24h}`,
      });
    }
  }, [currencyRupee]);

  console.log(currencyRupee);
  console.log(Coindata);

  return (
    <div className=" border-2 border-red-500 w-[90%] mx-12 mt-10 mb-10">
      <p>{data.name}</p>
      <div>
        current_price=
        {Coindata.current_price}
      </div>
      <div>
        high=
        {Coindata.high}
      </div>
      <div>
        low=
        {Coindata.low}
      </div>
      <div>
        priceChange=
        {Coindata.priceChange}
      </div>
      <div>
        pricePercentageChange=
        {Coindata.pricePercentageChange}
      </div>
      <br></br>
      <div>
        <div>
          <button
            className={`${currencyRupee ? "text-red-500" : "text-black"}`}
            onClick={() => {
              setcurrencyRupee(true);
            }}
          >
            RUPEE
          </button>
        </div>

        <div>
          <button
            className={`text-${currencyRupee ? "black" : "red-500"}`}
            onClick={() => {
              setcurrencyRupee(false);
            }}
          >
            DOLLAR
          </button>
        </div>
        <div>
          <Link
            to={{
              pathname: "/transaction",
            }}
            state={{ data }}
          >
            BUY
          </Link>
        </div>
        <div>
          <Link
            to={{
              pathname: "/transaction",
            }}
            state={{ data }}
          >
            SELL
          </Link>
        </div>
      </div>
    </div>
  );
}
