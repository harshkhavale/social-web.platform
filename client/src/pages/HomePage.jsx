import React, { useEffect, useState } from "react";
import Advertise from "../components/Advertise";
import { userRequest } from "../requestMethods";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import NewPost from "../mod/NewPost";
import User from "../components/User";
import FriendList from "../components/FriendList";
import { setPosts } from "../state";
const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const [feeds, setFeeds] = useState([]);
  const [modal, setModal] = useState(false);
  const toggleMode = () => {
    setModal(!modal);
  };
  const getFeeds = async () => {
    try {
      const axiosInstance = userRequest(token);
      const response = await axiosInstance.get("/posts/");
      dispatch(setPosts(response.data));
      setFeeds(response.data);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };
  useEffect(() => {
    getFeeds();
  }, [token, dispatch, user, posts]);

  return (
    <div className="homepage md:grid grid-cols-5 gap-2 lg:mx-10">
      {modal && <NewPost feedsControl={getFeeds} close={toggleMode} />}
      <div className="user col-span-1 shadow-md p-4 rounded-lg">
        <div className="user">
          <User />
        </div>
        <button
          className="border-2 border-sky-500 text-sky-500 font-bold py-2 px-4 rounded-xl"
          onClick={() => setModal(true)}
        >
          create new post
        </button>
      </div>
      <div className="feeds col-span-3">
        {feeds.length > 0
          ? feeds
              .slice()
              .reverse()
              .map((post) => (
                <Post feedsControl={getFeeds} key={post._id} post={post} />
              ))
          : "No feeds available"}
      </div>

      <div className="advertise col-span-1 p-2 ">
        <Advertise />
        <FriendList />
      </div>
    </div>
  );
};

export default HomePage;
