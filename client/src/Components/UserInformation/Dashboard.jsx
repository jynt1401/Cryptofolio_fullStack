import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import InfoCard from "../Cards/InfoCard";

export default function Dashboard() {
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
const url=userdata.userProfile

  const handleupdate = () => {
    navigate("/profileUpdate", { state: { id: userid } });
  };
  return (
    <>
      {userdata.Data && (
        <div>
          <InfoCard info={{data:userdata.Data,url:url}} />
          <div></div>

          <button onClick={handleupdate}>update informations</button>
        </div>
      )}

      {!userdata.Data && <div>Loading</div>}
    </>
  );
}
