import React, { useState } from "react";
import { IoCloseCircleSharp, IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import toast from "react-hot-toast";

const NewPost = ({ close,feedControl }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("picture", image);

      const response = await userRequest(token).post("posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      if (response.status === 201) {
        toast.success("Posted!");
        close();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again later.");
    }
    feedControl();
  };

  return (
    <div className="fixed z-40 inset-0  flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative newpost bg-white rounded-lg p-6 w-80 md:w-96">
        <div
          className="absolute z-50 -top-10  right-0 text-white  cursor-pointer "
          onClick={close}
        >
          <IoCloseCircleSharp className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <div className="relative mb-4 border-2 h-[10rem] w-full border-dashed border-black">
          <label htmlFor="image" className="">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              className={` absolute bottom-0 z-50 cursor-pointer ${
                imagePreview ? "text-white font-bold" : ""
              }  font-semibold py-2 px-4 rounded-md flex items-center justify-center`}
            >
              <IoCloudUploadOutline className="mr-2" />
              Upload Image
            </div>
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              name="picture"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-bold text-xs  mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-100 outline-none rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold text-xs mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-100 outline-none rounded-md p-2 w-full"
            rows="4"
          ></textarea>
        </div>
        <button
          className="border-2 border-sky-500 text-sky-500 font-bold py-2 px-4 rounded-xl"
          onClick={createPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPost;
