import React from "react";
import { logo, mainbg } from "../assets";
const LandingPage = () => {
  return (
    <div className="landingpage">
      <div className="home flex md:justify-start justify-center flex-wrap px-4 ">
        <p className=" text-3xl  text-center md:text-9xl md:w-min font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          One platform for all!
        </p>
        <img src={mainbg} className=" max-h-screen" alt="bg" />
      </div>
      <img
        src={logo}
        alt="logo"
        className=" absolute md:top-0 right-2 -z-10 top-16"
      />
    </div>
  );
};

export default LandingPage;
