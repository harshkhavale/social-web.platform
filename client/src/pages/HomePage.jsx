import React, { useEffect, useState } from "react";
import Advertise from "../components/Advertise";
import { userRequest } from "../requestMethods";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import NewPost from "../mod/NewPost";

const HomePage = () => {
  const token = useSelector((state) => state.token);
  const [feeds, setFeeds] = useState([]);
  const [modal,setModal] = useState(false);
  const toggleMode = () => {
    setModal(!modal);
  }
  useEffect(() => {
    const getFeeds = async () => {
      try {
        const axiosInstance = userRequest(token);
        const response = await axiosInstance.get("/posts/");
        // Extract data from the response and set the feeds state
        setFeeds(response.data);
      } catch (error) {
        console.error("Error fetching feeds:", error);
      }
    };
    getFeeds();
  }, [token]); // Removed feeds from the dependency array

  return (
    <div className="homepage grid grid-cols-5">
      {
        modal && <NewPost close={toggleMode} />
      }
      <div className="user col-span-1">
      <button className="border-2 border-sky-500 text-sky-500 font-bold py-2 px-4 rounded-xl"
         onClick={()=>setModal(true)}>new post</button>
       

      </div>
      <div className="feeds col-span-3">
  {feeds.length > 0 ? (
    feeds.slice().reverse().map((post) => <Post key={post._id} post={post} />)
  ) : (
    "No feeds available"
  )}
</div>

      <div className="advertise col-span-1">
        <Advertise />
      </div>
    </div>
  );
};

export default HomePage;
