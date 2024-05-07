import React, { useEffect, useState } from "react";
import { assetUrl, userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const FriendList = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      const response = await userRequest(token).get(
        `users/${user._id}/friends`
      );
      console.log(response.data);
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [user, token]);

  return (
    <div className="friends flex flex-col gap-2 mt-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        friends.map((friend) => (
          <div
            className="friend flex items-center shadow-md border justify-between gap-2 p-2"
            key={friend._id}
          >
            <img
              src={`${assetUrl}${friend.picture}`}
              className=" h-10 w-10 rounded-full object-cover"
              alt="friend"
            />
            <div className="friend-name text-sm font-bold">
              {friend.firstName + " " + friend.lastName}
            </div>
            <button className=" rounded-3xl border-2 text-sm font-bold p-1">
              unfollow
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendList;
