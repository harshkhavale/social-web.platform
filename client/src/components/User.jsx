import React from "react";
import { useSelector } from "react-redux";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import GrainIcon from "@mui/icons-material/Grain";
import { assetUrl } from "../requestMethods";
const User = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="user flex gap-8 flex-col">
      <div className=" flex gap-4">
        <img
          src={`${assetUrl}${user.picture}`}
          className=" rounded-full h-14 w-14"
          alt="profile"
        />
        <div>
          <p className="font-bold text-nowrap">
            {user.firstName + " " + user.lastName}
          </p>
          <span className=" text-gray-600 text-sm flex items-center gap-2">
            <FmdGoodIcon />
            LA, Los Angles
          </span>
        </div>
      </div>
      <div className="moreinfo my-4">
        <p className=" flex items-center gap-4 font-bold">
          <WorkOutlineIcon /> works at Google
        </p>
        <div>
          <p className=" flex items-center gap-4 font-bold"> 2.4 k follows</p>
          <p className=" flex items-center gap-4 font-bold"> 90 k followings</p>
        </div>
        <p className=" flex items-center gap-4 font-bold">
          <GrainIcon /> 263 impressions
        </p>
      </div>
    </div>
  );
};

export default User;
