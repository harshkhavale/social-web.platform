import React from "react";

const ForgotPassword = ({ userhandler, close, changeAuth }) => {
  
  return (
    <div className="ForgotPassword flex flex-col gap-4">
      <p className=" font-bold text-xl md:text-2xl">Recover Password!</p>
      <div>
        <div className="email">
          <input
            type="email"
            className=" border w-[83vw] md:w-full font-bold outline-none p-3"
            placeholder="Email"
            name="email"
            autocomplete="off"
          />
        </div>
      </div>
      <div className=" flex items-center flex-col gap-2">
        <button
          className=" bg-green-500 p-2 w-full  rounded-full text-white text-center font-bold"
          
        >
          recover password
        </button>
        <p>we will send the directions to the email</p>
        <p
          className=" md:hidden text-gray-600 font-normal underline underline-offset-4 text-nowrap cursor-pointer"
          onClick={()=>changeAuth('SU')}
        >
          or, Create Account
        </p>
      </div>

      
    </div>
  );
};

export default ForgotPassword;
