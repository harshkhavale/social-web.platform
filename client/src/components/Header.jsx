import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";

import { MdOutlineModeEdit } from "react-icons/md";
import AuthModel from "../mod/AuthModel";
import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";

const Header = () => {
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const logout = ()=>{
    console.log("logout");
    dispatch(setLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const user = useSelector((state)=>state.user);
  
  return (
    <div>

    <div className=" header font-semibold sticky top-0 z-40 bg-white flex justify-between p-4">
      <div className="logo flex items-center font-bold text-3xl justify-center">
      s
      <img src={logo} alt="logo-img" className=" h-8 w-8" />
      cial
      </div>
      <div className="search md:w-[20rem] flex md:text-sm font-bold gap-2 p-2 items-center focus:border-2 focus:border-black bg-gray-100 rounded-none">
        <MdOutlineSearch className=" font-bold text-xl text-gray-500" />
        <input
          type="text"
          className=" font-medium bg-transparent w-full outline-none"
          placeholder="Search for your favorites"
        />
      </div>
      {!user ? (
        <div className="link flex items-center text-nowrap">
          create account.{" "}
          <p className=" text-blue-500 cursor-pointer text-nowrap" onClick={handleModal}>
            It's free!
          </p>
          <MdArrowDropDown />
        </div>
      ) : (
        <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" onClick={toggleDropdown}>
            <img
              className="h-8 w-8 object-cover rounded-full cursor-pointer"
              src={`http://localhost:5000/assets/${user.picture}`}
              alt="profile-pic"
            />
            <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <MdArrowDropDown className="cursor-pointer" onClick={toggleDropdown} />
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      )}
    </div>

    <div className=" md:hidden text-white text-3xl fixed bottom-4 cursor-pointer z-50 right-4 write bg-sky-500 rounded-full p-2" onClick={handleModal}>
    <MdOutlineModeEdit />

    </div>
    {modal && <AuthModel handler={handleModal}  />}

    </div>

  );
};

export default Header;
