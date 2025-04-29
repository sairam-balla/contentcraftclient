import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { onLogout } from "../store/userSlice";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const onClickLogout = () => {
    dispatch(onLogout());
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <header className="shadow p-4 px-6 bg-white">
      <div className="flex justify-between items-center">
        <Link to="/user/home">
          <h1 className="font-semibold text-3xl font-[Lobster] text-blue-600">
            ContentCraft
          </h1>
        </Link>

        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-lg">
          <Link to="/user/home" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/user/saved" className="hover:text-blue-500">
            Saved
          </Link>
          <Link to="/user/credits" className="hover:text-blue-500">
            Credits
          </Link>
          <Link to="/user/profile" className="hover:text-blue-500">
            My Profile
          </Link>
          <button
            onClick={onClickLogout}
            className="bg-blue-500 rounded text-white px-4 py-1"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-semibold text-base">
          <Link to="/user/home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/user/saved" onClick={() => setMenuOpen(false)}>
            Saved
          </Link>
          <Link to="/user/credits" onClick={() => setMenuOpen(false)}>
            Credits
          </Link>
          <Link to="/user/profile" onClick={() => setMenuOpen(false)}>
            My Profile
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              onClickLogout();
            }}
            className="bg-blue-500 rounded text-white px-4 py-1 w-fit"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
