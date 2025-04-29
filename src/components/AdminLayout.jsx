import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <header className="shadow-md  p-4 ">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="font-semibold text-3xl font-[Lobster] text-blue-600">
            ContentCraft
          </h1>
          <h1 className="text-xl italic font-bold">Admin Dashboard</h1>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
