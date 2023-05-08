import React from "react";
import { useState } from "react";

export default function LoginModal({ closemod }) {
  const [credentials, setcredentials] = useState({
    first_name: "",
    last_name: "",
    age: "",
    mob: "",
    email: "",
    password: "",
  });
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [loggedin, setloggedin] = useState(false);

  const eventHandler = async () => {
    const response = await fetch("http://localhost:3001/register/creatuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        age: credentials.age,
        mob: credentials.mob,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.userexist) {
      alert("user already exist");
    } else {
      if (!json.success) {
        alert("enter correct credentials");
      } else {
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        console.log("done");
        setloggedin(true);
      }
    }
  };


  //--------------------------create wallet----------------//

  

  //--------------------------create wallet----------------//

  if (loggedin) {
    closemod[0](false);
  } else {
    return (
      <div>
        <div className="w-[100%] fixed top-0 h-full snap-none z-10  bg-[#1c1c1cdf]">
          {/* background div*/}
          <div className="text-black bg-white rounded-md border-2 border-red-500 w-[50%] m-auto">
            {/* container div*/}
            <button
              onClick={() => {
                closemod[0](false);
              }}
            >
              X
            </button>
            <div>
              {/* details div*/}

              <h1>this is login form</h1>

              {/* //login form */}

              <form>
                <div>
                  <label for="first_name">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={credentials.first_name}
                    onChange={onchange}
                    className="text-black"
                  />
                </div>
                <div>
                  <label for="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={credentials.last_name}
                    onChange={onchange}
                    className="text-black"
                  />
                </div>
                <div>
                  <label for="age">age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={credentials.age}
                    onChange={onchange}
                    className="text-black"
                  />
                </div>
                <div>
                  <label for="mob">mobile number</label>
                  <input
                    type="number"
                    id="mob"
                    name="mob"
                    value={credentials.mob}
                    onChange={onchange}
                    className="text-black"
                  />
                </div>
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
                    type="text"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={onchange}
                    className="text-black"
                  />
                </div>
              </form>

              <button onClick={eventHandler}>login</button>
              <div></div>
              <button
                onClick={() => {
                  closemod[1](true);
                  closemod[0](false);
                }}
              >
                already a user
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
