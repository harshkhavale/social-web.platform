import React, { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import toast from "react-hot-toast";
const SignIn = ({ close, changeAuth }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await publicRequest.post("/auth/login", formData);
      console.log(response.data);
      if (response.status === 200) {
        const loggedIn = response.data;
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
        }
        
        // Handle successful sign-in, such as updating state or showing a success message
        console.log("Sign-in successful", loggedIn);
        toast.success("Sign-in successful!");
        close();
      } else {
        // Handle sign-in failure, such as displaying an error message
        console.error("Sign-in failed", response.statusText);
       
        toast.error("user dose not exists! check your credentials");

        
      }
    } catch (error) {
      console.error("Sign-in error", error);
      toast.error("user dose not exists! check your credentials");

    }
  };

  return (
    <div className="signin flex flex-col gap-4">
      <p className="font-bold text-xl md:text-2xl">Welcome Back!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="email">
            <input
              type="email"
              className="border w-[83vw] md:w-full font-bold outline-none p-3"
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
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-blue-500 p-2 w-full rounded-full text-white text-center font-bold"
          >
            Sign In
          </button>
         
        </div>
      </form>
      <div className="other flex flex-col gap-2">
        <p
          className="font-bold text-center my-2 cursor-pointer"
          onClick={() => changeAuth("FP")}
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default SignIn;
