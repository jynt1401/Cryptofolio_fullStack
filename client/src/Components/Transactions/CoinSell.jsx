import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CoinSell() {
  const { state } = useLocation();

  console.log("hello");
  // console.log(state.data);

  const [data, setdata] = useState();
  const [currprise, setcurrprise] = useState();

  useEffect(() => {
    setdata(state.data);
  }, [data]);

  useEffect(() => {
    setcurrprise(
      ((`${state.data.current_price}` / 100) * 70).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      })
    );

    console.log(currprise);
    console.log(data);
  }, []);

  //-----------------transactions--------------------//

  const login = localStorage.getItem("authToken");
  console.log(login);

  const [allTransaction, setallTransaction] = useState([]);
  useEffect(() => {
    getallTransaction();
  }, []);
  const getallTransaction = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:3001/wallet/getwalletTransaction",
      data: {
        login: login,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      console.log("transactions");
      console.log(res.data);

      setallTransaction(res.data);
    });
  };
  console.log(allTransaction);

  const [currBalance, setcurrBalance] = useState();

  const getamount = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:3001/wallet/getwalletAmount",
      data: {
        login: login,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      console.log("current balance");

      setcurrBalance(res.data[0].Amount);
    });
  };
  console.log(currBalance);

  const getusertransaction_byQuantity = async () => {
    if (Number(Quantity) <= 0) {
      alert("enter amount");
    } else {
      console.log("HIIIIII");

      await getamount();

      let object = {
        CoinId: state.data.id,
        Quantity: Quantity,
        Amount: (`${state.data.current_price}` / 100) * 70 * Quantity,
        Date: new Date(),
        Prise: (`${state.data.current_price}` / 100) * 70,
      };

      allTransaction.push(object);
      console.log(allTransaction);

      console.log((`${state.data.current_price}` / 100) * 70 * Quantity);
      console.log(currBalance);

      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/transactions/transactions",
        data: {
          Quantity: Quantity,
          Amount: (`${state.data.current_price}` / 100) * 70 * Quantity,
          login: login,
          CoinName: data.name,
          Transaction: allTransaction,
        },
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        console.log("response heuhfiehfal--------------------");
        console.log(res.data);
        if (res.data === "NO") {
          alert("not enough balance");
        }
      });
    }
  };

  const getusertransaction_byAmount = async () => {
    await getamount();

    console.log((`${state.data.current_price}` / 100) * 70 * Quantity);
    console.log(currBalance);

    const response = await axios({
      method: "POST",
      url: "http://localhost:3001/transactions/transactions",
      data: {
        Quantity:
          Amount_for_amount / ((`${state.data.current_price}` / 100) * 70),
        Amount: Amount_for_amount,
        login: login,
        CoinName: data.name,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      console.log("response");
      console.log(res.data);
      if (res.data === "NO") {
        alert("not enough balance");
      }
    });
  };

  //-----------------transactions--------------------//

  //----------------input value by quantity--------------//

  const [Quantity, setQuantity] = useState("");
  const [Amount, setAmount] = useState("");

  useEffect(() => {
    if (Quantity.length === 0) {
      setAmount("");
    }
  }, [Quantity, Amount]);

  const onchangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    setAmount(
      ((`${state.data.current_price}` / 100) * 70 * Quantity).toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }
      )
    );
  }, [Quantity]);

  //----------------input value by quantity --------------//

  //----------------input value by amount--------------//

  const [Quantity_for_amount, setQuantity_for_amount] = useState("");
  const [Amount_for_amount, setAmount_for_amount] = useState("");

  useEffect(() => {
    if (Amount_for_amount.length === 0) {
      setAmount_for_amount("");
    }
  }, [Quantity, Amount]);

  const onchangeAmount = (e) => {
    setAmount_for_amount(e.target.value);
  };

  useEffect(() => {
    setQuantity_for_amount(
      Amount_for_amount / ((`${state.data.current_price}` / 100) * 70)
    );
  }, [Amount_for_amount]);

  //----------------input value amount --------------//

  return (
    <div className="pt-[200px] text-black">
      <div className=" w-[100px] h-[100px] ">
        <img src={data?.image} alt=""></img>
      </div>
      <div>{data?.name}</div>
      <div>{currprise}</div>
      <div>
        <div className="border-2">
          <div>Buy by qantity</div>
          <label for="">Quantity</label>
          <input
            type="text"
            id=""
            name=""
            value={Quantity}
            onChange={onchangeQuantity}
            className="text-black"
            placeholder="enter quantity "
          />
          <div>
            <p>amount: {Amount}</p>
          </div>
          <button onClick={getusertransaction_byQuantity}>Buy</button>
        </div>
        <div className="border-2">
          <div>Buy by Amount</div>
          <label for="">Amount</label>
          <input
            type="Number"
            id=""
            name=""
            value={Amount_for_amount}
            onChange={onchangeAmount}
            className="text-black"
            placeholder="enter amount "
          />
          <div>
            <p>quantity: {Quantity_for_amount}</p>
          </div>
          <button onClick={getusertransaction_byAmount}>Buy</button>
        </div>
      </div>
    </div>
  );
}
