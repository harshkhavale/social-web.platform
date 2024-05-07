import React from "react";
import { assetUrl } from "../requestMethods";

const Advertise = () => {
  return (
    <div className="advertise bg-sky-100 rounded-lg">
      <img
        className=" h-full w-full rounded-md"
        src={`${assetUrl}advertise.jpg`}
        alt=""
      />
      <p className=" text-sm font-bold p-2">
        Buy Best Face Foundation Online for All Skin in India makeupstudio.in
        https://www.makeupstudio.in › shop › foundation foundation skin from
        www.makeupstudio.in
      </p>{" "}
    </div>
  );
};

export default Advertise;
