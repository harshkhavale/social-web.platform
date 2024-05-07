import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { authbg } from "../assets";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

const AuthModel = ({ handler, userhandler, init }) => {
  const [account, setAccount] = useState(init);

  const changeAuth = (newState) => {
    setAccount(newState);
  };

  return (
    <div className="fixed z-40 inset-0  flex justify-center items-center bg-black bg-opacity-50">
      <div
        className="fixed z-50  md:-top-32 md:right-20 -top-6 -right-36  p-40  text-3xl text-white   cursor-pointer "
        onClick={handler}
      >
        <IoCloseCircleSharp />
      </div>
      <div className="modal  overflow-hidden bg-white absolute md:inset-0  bottom-0  h-min lg:mx-[15rem] md:m-[5rem] shadow-xl">
        <div className=" hidden md:visible header md:flex justify-center items-center text-sm font-semibold p-4 bg-green-100 text-green-600 ">
          Let's learn, share & inspire each other with our passion for computer
          engineering. Sign up now 🤘🏼
        </div>
        <div className="main md:grid grid-cols-2 flex justify-center gap-4">
          <div className="component col-span-1 p-8">
            {account === "SI" && (
              <SignIn
                changeAuth={changeAuth}
                userhandler={userhandler}
                close={handler}
              />
            )}
            {account === "SU" && (
              <SignUp
                changeAuth={changeAuth}
                userhandler={userhandler}
                close={handler}
              />
            )}
            {account === "FP" && (
              <ForgotPassword
                changeAuth={changeAuth}
                userhandler={userhandler}
                close={handler}
              />
            )}
            {account === "RP" && (
              <ResetPassword
                changeAuth={changeAuth}
                userhandler={userhandler}
                close={handler}
              />
            )}
            <div className=" flex items-center flex-col p-4 z-10 justify-end">
              {account === "SU" ? (
                <div className=" flex items-center  flex-wrap justify-end">
                  <p className="text-sm ">Already have an account?</p>
                  <p
                    className="text-blue-500 font-bold px-2 cursor-pointer"
                    onClick={() => changeAuth("SI")}
                  >
                    Sign In
                  </p>
                </div>
              ) : account === "SI" ? (
                <div className=" flex items-center flex-wrap justify-center">
                  <p className="text-sm text-nowrap">
                    Don’t have an account yet?
                  </p>
                  <p
                    className="text-blue-500 font-bold px-2 cursor-pointer text-nowrap"
                    onClick={() => changeAuth("SU")}
                  >
                    Create new for free!
                  </p>
                </div>
              ) : (
                <div className=" flex items-center flex-wrap justify-center">
                  <p className="text-sm text-nowrap">
                    Don’t have an account yet?
                  </p>
                  <p
                    className="text-blue-500 font-bold px-2 cursor-pointer text-nowrap"
                    onClick={() => changeAuth("SU")}
                  >
                    Create new for free!
                  </p>
                </div>
              )}
              <p className="text-xs text-center">
                By signing up, you agree to our Terms & conditions, Privacy
                policy
              </p>
            </div>
          </div>
          <div className=" relative overflow-hidden hidden md:visible md:flex col-span-1 flex-col gap-1">
            <img
              src={authbg}
              alt="bg-img"
              className=" w-full h-full object-cover z-0 absolute bottom-0 right-0 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModel;
