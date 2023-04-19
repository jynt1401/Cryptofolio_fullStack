import React from "react";

import ProfileImage from "../Cards/ProfileImage";

export default function InfoCard({ info }) {
    console.log(info)
  return (
    <div>
      <div>
        {info.data.first_name}

        {info.data.last_name}
        {info.data.age}
        {info.data.mob}
        {info.data.email}

        {/* <div
         className="w-[200px] h-[200px] m-auto  bg-cover"
         style={{ backgroundImage: `url(${userdata.userProfile[0].url})` }}
          ></div> */}
        <ProfileImage img={info.url[0].url} />
      </div>
    </div>
  );
}
