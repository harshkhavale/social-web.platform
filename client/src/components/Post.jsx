import React, { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { assetUrl, userRequest } from "../requestMethods";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import toast from "react-hot-toast";
const Post = ({ post ,feedsControl}) => {
  const token = useSelector((state) => state.token);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  const [commentToggle, setCommentToggle] = useState(false);
  const likedByCurrentUser = Object.keys(post.likes).includes(user._id);
  const isFriend = user.friends.includes(post.userId);

  const likePost = async () => {
    const response = await userRequest(token).patch(`/posts/${post._id}/like`, {
      userId: user._id,
    });
    console.log(response);
    setLike(false);
    feedsControl();
  };
  const commentPost = async () => {
    const response = await userRequest(token).post(
      `/posts/${post._id}/comments`,
      {
        userId: user._id,
        userPicturePath: user.picture,
        userName: user.firstName + user.lastName,
        comment: comment,
      }
    );
    console.log(response);
    if (response.status === 201) {
      setComment("");
      toggleCommentToggle();
      toast.success(`commented on ${user.firstName} s post`);
    }
    feedsControl();
  };
 
  const toggleCommentToggle = () => {
    setCommentToggle(!commentToggle);
  };
  const deletePost = async () => {
    const response = await userRequest(token).delete(`/posts/${post._id}`);
    console.log(response);
    if (response.status === 200) {
      toast.success(`deleted ${user.firstName} s post`);
    } else {
      toast.error(`failed to delete ${user.firstName} s post`);
    }
    feedsControl();
  };
  const handleFollow = async () => {
    const response = await userRequest(token).patch(
      `/users/${user._id}/${post.userId}`
    );
    if (response.status === 200) {
      toast.success(`followed ${post.firstName}`);
    } else {
      toast.error(`failed to follow ${post.firstName}`);
    }
    feedsControl();
  };
  return (
    <div className="bg-white relative  shadow-sm border m-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-2">
        <div className=" flex items-center gap-2">
          <img
            src={`${assetUrl}${post.userPicturePath}`}
            alt="User"
            className="h-10 w-10 rounded-full object-cover mr-2"
          />

          <div className="px-2">
            <h2 className="text-lg font-semibold">{`${post.firstName} ${post.lastName}`}</h2>
            <p className="text-gray-600 font-bold text-xs">{post.location}</p>
          </div>
        </div>

        {post.userId === user._id ? (
          <div
            className="remove absolute rounded-full  bg-white right-4"
            onClick={deletePost}
          >
            <RiDeleteBinLine className="text-red-500 h-10 w-10  p-2" />
          </div>
        ) : (
          <button
            className="p-1 border-2 text-sm flex items-center border-sky-500 rounded-2xl text-sky-500 font-bold"
            onClick={handleFollow}
          >
            {
              isFriend
               ? "unfollow"
                : (<div className=" flex items-center"><p>follow</p><AddCircleOutlineIcon /></div>)
            }
          </button>
        )}
      </div>
      <img
        src={`${assetUrl}${post.picture}`}
        alt="Post"
        className="w-full h-auto object-contain"
      />

      <div className="p-4">
        <p className="text-gray-500 font-bold  mb-4">{post.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <div>
            <button className="font-semibold text-red-500" onClick={likePost}>
              {likedByCurrentUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
            <span className=" font-bold">{Object.keys(post.likes).length}</span>
          </div>
          <div>
            <button
              className="text-blue-500 font-semibold"
              onClick={toggleCommentToggle}
            >
              {commentToggle ? (
                <ModeCommentIcon />
              ) : (
                <ModeCommentOutlinedIcon />
              )}
            </button>
            <span className="ml-2 font-bold">{post.comments.length}</span>
          </div>
          <button className="text-green-500 font-semibold h-12">
            <ArrowOutwardIcon />
          </button>
          <span className="ml-2 font-bold">23</span>
        </div>
        <div className=" flex items-center flex-wrap gap-2">
          {post.comments.map((comment, index) => (
            <div
              key={index}
              className=" flex items-center justify-between w-full"
            >
              <div>
                <p className=" text-gray-400 font-bold">{comment.comment}</p>
                <p className=" font-bold text-sm">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <div className=" flex items-center gap-4">
                <p className=" hidden md:visible font-bold">{comment.userName}</p>
                <img
                  src={`${assetUrl}${comment.userPicturePath}`}
                  className=" rounded-full h-10 w-10"
                  alt="profile"
                />
              </div>
            </div>
          ))}
        </div>

        {commentToggle && (
          <div className="mt-4">
            <textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full font-bold h-20 p-2 outline-none bg-gray-100 rounded-xl"
            />
            <button
              className="border-2  border-sky-500 text-sky-500 font-bold py-2 px-4 rounded-xl"
              onClick={commentPost}
            >
              post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
