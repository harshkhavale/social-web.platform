import React, { useState } from "react";
import { publicRequest } from "../requestMethods";
import toast from "react-hot-toast";

const ForgotPassword = ({ userhandler, close, changeAuth }) => {
  const [email, setEmail] = useState("");

  const sendRecoveryMail = async () => {
    const response = await publicRequest.post("/auth/forgot-password", {
      email: email,
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("Recovery mail sent successfully");
      close();
    } else {
      toast.error("User with this email not exist");
      changeAuth("SU");
    }
  };
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className=" flex items-center flex-col gap-2">
        <button
          className=" bg-green-500 p-2 w-full  rounded-full text-white text-center font-bold"
          onClick={sendRecoveryMail}
        >
          send mail
        </button>
        <p>we will send the directions to the email for password recovery</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
