import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, setUserInfo } from "../store/userSlice";
const Sidebar = () => {
  const [logoutPopup, setLogoutPopup] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const userLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutUser());
  };

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch(setUserInfo(userInfo));
    }
  }, [setUserInfo]);

  return (
    <div className="col-span-3 pt-8 flex flex-col justify-between sticky top-0 h-screen">
      <div>
        <img
          className="w-10 h-10 rounded-full object-contain ml-6 cursor-pointer"
          src="data:image/png;base64,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"
          alt="logo"
        />
        <div className="pt-8 pl-1">
          <p className="flex items-center gap-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-solid fa-house text-xl "></i>
            <span className="font-bold text-2xl">Home</span>
          </p>
          <p className="flex items-center gap-4 mt-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-solid fa-hashtag text-xl "></i>
            <span className="font-bold text-2xl">Explore</span>
          </p>
          <p className="flex items-center gap-4 mt-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-solid fa-bell text-xl"></i>
            <span className="font-bold text-2xl">Notifications</span>
          </p>
          <p className="flex items-center gap-4 mt-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-regular fa-envelope text-xl"></i>
            <span className="font-bold text-2xl">Messages</span>
          </p>
          <p className="flex items-center gap-4 mt-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-regular fa-bookmark text-xl"></i>
            <span className="font-bold text-2xl">Bookmarks</span>
          </p>
          <p className="flex items-center gap-4 mt-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-brands fa-square-twitter text-xl"></i>
            <span className="font-bold text-2xl">Twitter Blue</span>
          </p>
          <p className="flex items-center gap-4 mt-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-regular fa-user text-xl"></i>
            <span className="font-bold text-2xl">Profile</span>
          </p>
          <p className="flex items-center gap-4 mt-4 text-2xl text-white px-6 py-2 rounded-full hover:bg-gray-900 cursor-pointer w-max">
            <i className="fa-solid fa-ellipsis-vertical text-xl rotate-90 border-2 border-white -ml-1 w-8 h-8 flex items-center justify-center rounded-full"></i>
            <span className="font-bold text-2xl">More</span>
          </p>
          <button className="bg-[#1D9BF0] px-8 py-3 rounded-full text-white text-2xl font-bold hover:bg-[#1185d2] mt-3 w-64">
            Tweet
          </button>
        </div>
      </div>

      <div className="mb-10">
        {user?.name ? (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full">
              <img
                src={
                  user.profilePic
                    ? user.profilePic
                    : "data:image/png;base64,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"
                }
                alt={user.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-400">{user.name}</p>
              <p className="text-lg font-semibold text-white">
                {user.username}
              </p>
            </div>
            <div className="relative">
              <i
                onClick={() => setLogoutPopup((prev) => !prev)}
                className=" w-10 h-10 rounded-full flex items-center justify-center text-white text-xl text-bold hover:bg-gray-800 cursor-pointer fa-solid fa-ellipsis-vertical"
              ></i>
              {logoutPopup && (
                <div
                  className="absolute bg-gray-900 w-44 rounded-xl right-0 -top-20 cursor-pointer"
                  onClick={userLogout}
                >
                  <p className="text-white text-xl text-bold hover:bg-gray-950 w-full py-4 pl-4">
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/auth">
            <button className="text-xl text-white flex items-center gap-4  hover:bg-gray-900 cursor-pointer w-max px-8 py-3 rounded-full">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className="font-bold text-2xl">Login</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
