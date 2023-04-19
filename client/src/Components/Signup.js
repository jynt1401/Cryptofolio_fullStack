import React from "react";
import { useState } from "react";

export default function Signup({ closemod }) {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [loggedin, setloggedin] = useState(false);

  const eventHandler = async () => {
    const body = {
      email: credentials.email,
      password: credentials.password,
    };
    const response = await fetch("http://localhost:3001/register/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    //  const json=response.json();
    const data = await response.text();
    //  console.log(data);
    if (data == "No such user found") {
      alert("No such user found");
    } else {
      closemod[1](false);
      
      const leyy = JSON.parse(data);
      console.log(leyy);
      localStorage.setItem("authToken",leyy.authToken);
      console.log(localStorage.getItem("authToken"))
    }

    //  console.log(json);

    //  if(!json.success){
    //   console.log("hi");
    //      alert("enter  credentials");
    //  }
  };

  return (
    <div>
      <div className="w-[100%] fixed top-0 h-screen snap-none  z-100 bg-[#1c1c1cdf]">
        <div className="text-white">
          <button
            onClick={() => {
              closemod[1](false);
            }}
          >
            X
          </button>

          <h1>sign in if you have accouhnt</h1>

          <div></div>
          <form>
            <div>
              <label for="email">email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onchange}
                className="text-black"
              />
            </div>
            <div>
              <label for="password">password</label>
              <input
                type="number"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onchange}
                className="text-black"
              />
            </div>
          </form>

          <div></div>
          <button onClick={eventHandler}>signup</button>
          <div></div>
          <button
            onClick={() => {
              closemod[0](true);
              closemod[1](false);
            }}
          >
            first time
          </button>
        </div>
      </div>
    </div>
  );
}
