import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ModalTransactions from "./ModalTransactions";

export default function Dashboard() {
  const refresh = () => window.location.reload(true);
  useEffect(()=>{},[]);
  
  //---------------------------------------tramsactions------------------------------//

  const login = localStorage.getItem("authToken");
  console.log(login);

  const [allTransaction, setallTransaction] = useState([]);
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

      setallTransaction(res.data.reverse());
    });
  };
  useEffect(() => {
    getallTransaction();

  }, []);

  console.log(allTransaction);

  const [opentransaction, setopentransaction] = useState(false);
  const [datatransaction, setdatatransaction] = useState({});
  console.log(datatransaction);

  //---------------------------------------tramsactions------------------------------//

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const userid = location.state.id;
  console.log(userid);

  const [userdata, setuserdata] = useState({});

  //-------------------------------------image------------------------------------------//

  //-------------------------------------image-----------------------------------------//

  useEffect(() => {
    const fetchuserdata = async () => {
      const response = await fetch(
        "http://localhost:3001/dashboard/userdetails",
        {
          method: "POST",
          body: JSON.stringify({ UserId: userid }),
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },

          header: "Access-Control-Allow-Origin: *",
        }
      );
      const json = await response.json();

      console.log("response we get from dashboard");
      console.log(json);
      setuserdata(json);
    };
    fetchuserdata();
  
  }, []);

  console.log(userdata);
  console.log(userdata.Data);
  console.log(userdata.userProfile);
  const url1 = userdata.userProfile;
  // const url=url1[0].url
  // console.log(url);

  const handleupdate = () => {
    navigate("/profileUpdate", { state: { id: userid } });
  };

  return (
    <div className="bg-[#171b26] h-content">
      {opentransaction ? (
        <ModalTransactions
          fun={{ data: datatransaction, open: setopentransaction }}
        />
      ) : (
        <div></div>
      )}

      {userdata.Data && (
        <div>
          <div className="pt-[100px] bg-[#1d2230] w-[70%]  mx-auto h-screen  ">
            <div className="grid grid-cols-1 md:grid-cols-2 w-[60%] mx-auto">
              <div
                className="w-[150px] h-[150px] bg-cover m-5 mx-auto border-2"
                // style={{ backgroundImage: `url(${})` }}
              ></div>

              <div className="text-white  m-5 mx-auto">
                <div className="m-2 font-semibold grid grid-cols-1 md:grid-cols-2 ">
                  <div className="mr-3">Name </div>
                  <div className="grid grid-cols-2 mx-auto">
                    {userdata.Data.first_name}
                    {userdata.Data.last_name}
                  </div>
                </div>
                <div className="m-2 font-semibold grid grid-cols-1 md:grid-cols-2  ">
                  <div className="mr-3">Mobile </div>
                  <div className="grid grid-cols-2 mx-auto">
                    {userdata.Data.mob}
                  </div>
                </div>
                <div className="m-2 font-semibold grid grid-cols-1 md:grid-cols-2 ">
                  <div className="mr-3">Email </div>
                  <div className="text-[12px] md:text-[16px] ">
                    {userdata.Data.email}
                  </div>
                </div>
                <button
                  className="bg-[#209fe4]  md:w-[100%] mx-auto
               p-1 mt-2  rounded-md font-semibold text-[12px] md:text-[15px] mb-4"
                  onClick={handleupdate}
                >
                  update informations
                </button>
              </div>
            </div>

            <div>
              <div className="w-[90%]  mx-auto bg-[#272e41] p-5  rounded-lg ">
                <div className="font-bold text-white text-center  md:text-left text-[20px] md:text-[22px] mb-8">
                  Transactions
                </div>
                <div className=" w-[80%[ mx-auto max-h-[400px] overflow-y-scroll">
                  {allTransaction.map((value, key) => {
                    return (
                      <div
                        onClick={() => {
                          setopentransaction(true);
                          setdatatransaction(value);
                        }}
                      >
                        <div className="bg-[#171b26] rounded-lg text-white m-3 p-4 md:grid md:grid-cols-3 ">
                          <div className="w-[100%] md:w-[100%]">
                            <div className="font-semibold text-white text-center text-[14px] md:text-[17px] mb-2 ">
                              {value.CoinName}
                            </div>
                            <div className=" w-[50px] h-[50px] mx-auto ">
                              <img src={value.img} alt=""></img>
                            </div>
                          </div>
                          <div className="hidden md:grid  md:grid-cols-1 lg:grid-cols-2  col-span-2">
                            <div className="">
                              <div className="text-center font-semibold lg:text-[20px] lg:m-2">
                                Quantity
                              </div>
                              <div className="text-center font-bold lg:m-2">
                                {value.Quantity}
                              </div>
                            </div>
                            <div className="">
                              <div className="text-center font-semibold lg:m-2 lg:text-[20px]">
                                Amount
                              </div>
                              <div className="text-center font-bold lg:m-2">
                                ₹{value.Amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!userdata.Data && <div>Loading</div>}
    </div>
  );
}
