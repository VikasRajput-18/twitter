import React from "react";

const RightSidebar = () => {
  return (
    <div className="col-span-3 sticky h-screen top-0 pt-8">
      <div>
        <input
          type="search"
          className=" rounded-full px-3 bg-[#202327] w-full py-2 text-xl text-white"
          placeholder="Search twitter"
        />
      </div>

      <div className=" bg-[#202327] p-4 mt-4 rounded-lg ">
        <div className="">
          <p className="text-gray-400 ">Trending in India</p>
          <p className="text-white text-xl font-extrabold">#Virat Kohli</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-400 ">Anime . Netflix</p>
          <p className="text-white text-xl font-extrabold">#Demon Slayer</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-400 ">Entertainment</p>
          <p className="text-white text-xl font-extrabold">Goku VS Saitama</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-400 ">IPL . Live</p>
          <p className="text-white text-xl font-extrabold">#MSDhoni</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
