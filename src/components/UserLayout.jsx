import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default UserLayout;
