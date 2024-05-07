import React from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { userRequest } from "../requestMethods";
const Post = ({ post }) => {
 const token = useSelector((state)=> state.token);
  const user = useSelector((state)=>state.user);
  const likePost = async()=>{
    const response = await userRequest(token).patch(`/posts/${post._id}/like`, {
      userId: user._id
    });
    console.log(response);
  }
  return (
    <div className="bg-white relative  shadow-sm m-4 rounded-lg overflow-hidden">
      {
        post.userId === user._id && (
<div className="remove absolute rounded-full  bg-white right-4">
        <RiDeleteBinLine className="text-red-500 h-10 w-10  p-2" />
      </div>
        )
      }
      <img
        src={`http://localhost:5000/assets/${post.picture}`}
        alt="Post"
        className="w-full max-h-[50vh] h-auto object-contain"
      />

      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={`http://localhost:5000/assets/${post.userPicturePath}`}
            alt="User"
            className="h-10 w-10 rounded-full object-cover mr-2"
          />
          <div>
            <h2 className="text-lg font-semibold">{`${post.firstName} ${post.lastName}`}</h2>
            <p className="text-gray-600">{post.location}</p>
          </div>
        </div>

        {/* Post Description */}
        <p className="text-gray-800 mb-4">{post.description}</p>

        {/* Like and Comment Buttons */}
        <div className="flex items-center gap-2 mb-4">
          <button className="text-gray-400 font-semibold" onClick={likePost}><FavoriteBorderIcon/></button>
          <button className="text-gray-400 font-semibold"><ModeCommentOutlinedIcon/></button>
          <button className="text-gray-400 font-semibold h-12"><ArrowOutwardIcon/></button>

        </div>

        {/* Likes and Comments Count */}
        <div className="text-gray-600">
          <span>{Object.keys(post.likes).length} Likes</span>
          <span className="ml-2">{post.comments.length} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
