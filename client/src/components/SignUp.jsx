import React, { useState } from "react";

import { GrCloudUpload } from "react-icons/gr";
import { publicRequest } from "../requestMethods";
import toast from "react-hot-toast";
const SignUp = ({ close, changeAuth }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const selectedFile = e.target.files[0];
      setFormData({
        ...formData,
        picture: selectedFile ? selectedFile : null,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      formDataToSend.append("picture", formData.picture);

      console.log("FORMDATA", formData);
      const loggedIn = await publicRequest.post(
        "/auth/register",
        formDataToSend
      );
      if (loggedIn.status === 201) {
        toast.success("Account created successfully! SIGNIN please");
        changeAuth("SI");
      }

      close();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oops, something went wrong!");
    }
  };

  return (
    <div className="signup flex flex-col gap-4">
      <p className="font-bold text-xl md:text-2xl">Create Account</p>
      <div>
        <div className="name flex items-center w-full">
          <input
            type="text"
            className="border font-bold w-6/12 outline-none p-3"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="text"
            className="border font-bold w-6/12 outline-none p-3"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="email">
          <input
            type="email"
            className="border w-full font-bold outline-none p-3"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="password">
          <input
            type="password"
            className="border w-full font-bold outline-none p-3"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="cpassword">
          <input
            type="password"
            className="w-full border font-bold outline-none p-3"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="profile">
          <label className="relative cursor-pointer border-2 border-dashed flex items-center border-black p-2 justify-center font-bold">
            <input
              type="file"
              className="hidden"
              onChange={handleChange}
              name="picture"
              accept="image/*"
            />
            <span className="flex items-center justify-center">
              <GrCloudUpload className="w-6 h-6 " />
            </span>
            <span className="ml-2">
              {formData.picture
                ? formData.picture.name
                : "Upload profile picture"}
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="bg-blue-500 p-2 w-full rounded-full cursor-pointer text-white text-center font-bold"
          onClick={handleSubmit}
        >
          Create Account
        </button>{" "}
      </div>
    </div>
  );
};

export default SignUp;
