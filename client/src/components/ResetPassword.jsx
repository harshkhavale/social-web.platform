import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import toast from "react-hot-toast";

const ResetPassword = ({ userhandler, close, changeAuth }) => {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await publicRequest.post("/auth/reset-password", {
          token: token,
          newPassword: newPassword,
        });
        if (response.status === 200) {
          toast.success("Password changed successfully! SIGNIN please");
          changeAuth("SI");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("new password and confirm password do not match");
    }
  };

  return (
    <div className="ResetPassword flex flex-col gap-4">
      <p className=" font-bold text-xl md:text-2xl">Recover Password!</p>
      <div>
        <div className="password">
          <input
            type="password"
            className=" border w-[83vw] md:w-full font-bold outline-none p-3"
            placeholder="New Password"
            name="newpassword"
            autoComplete="off"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="cpassword">
          <input
            type="password"
            className=" border w-[83vw] md:w-full font-bold outline-none p-3"
            placeholder="Confirm New Password"
            name="cnewpassword"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className=" flex items-center flex-col gap-2">
        <button
          className=" bg-green-500 p-2 w-full  rounded-full text-white text-center font-bold"
          onClick={handleResetPassword}
        >
          Recover Password
        </button>
        <p>We will send the directions to the email</p>
        <p
          className=" md:hidden text-gray-600 font-normal underline underline-offset-4 text-nowrap cursor-pointer"
          onClick={() => changeAuth("SU")}
        >
          or, Create Account
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
