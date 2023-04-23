import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainComponent from "../components/MainComponent";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  return (
    <div className="grid grid-flow-col min-h-screen max-w-7xl gap-4 mx-auto ">
      <Sidebar />
      <MainComponent />
      <RightSidebar />
    </div>
  );
};

export default Home;
