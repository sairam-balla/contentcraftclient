import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(
        "https://content-craft-server-696839166197.us-central1.run.app/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
      setErrors({ general: "Registration failed. Try again." });
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-md bg-white p-6 sm:p-8 shadow-md rounded-md gap-4"
      onSubmit={handleRegister}
    >
      <h2 className="text-3xl mb-2 font-bold text-center text-gray-800">
        Register
      </h2>

      {errors.general && (
        <div className="text-red-500 text-sm text-center">{errors.general}</div>
      )}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {errors.username && (
        <div className="text-red-500 text-xs">{errors.username}</div>
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {errors.email && (
        <div className="text-red-500 text-xs">{errors.email}</div>
      )}

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {errors.password && (
        <div className="text-red-500 text-xs">{errors.password}</div>
      )}

      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 transition">
        Register
      </button>

      <p className="text-sm text-center mt-2">
        Already have an account?{" "}
        <Link to="/auth/login">
          <span className="text-blue-600 underline">Login</span>
        </Link>
      </p>
    </form>
  );
};

export default Register;
