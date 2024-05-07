import React from "react";

const User = ({ profile, name }) => {
  return (
    <div className="user bg-gray-200 p-4 flex gap-8">
      <img
        src={`http://localhost:5000/assets${profile}`}
        className=" rounded-full h-10 w-10"
        alt="profile"
      />
      <p>{name}</p>
    </div>
  );
};

export default User;
