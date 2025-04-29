import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" h-screen flex flex-col px-4 py-8 justify-center items-center bg-gradient-to-b from-[#ad5389] to-[#3c1053]">
      <h1 className="font-semibold mb-4  text-3xl font-[Lobster]">
        ContentCraft
      </h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
