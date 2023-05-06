import React from "react";
import { useEffect } from "react";
import CoinSell from "../Transactions/CoinSell";

export default function ProtectedTransaction({ open }) {
  console.log(open);

  useEffect(() => {
    const login = localStorage.getItem("authToken");
    console.log(login);
    if (!login) {
      open[1](true);
    }
  });
  return (
    <div className="bg-red-500 h-screen">
      <CoinSell />
    </div>
  );
}
