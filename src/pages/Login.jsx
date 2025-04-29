import React, { useState } from "react";
import { Link, useNavigate, replace } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { onLogin } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      localStorage.removeItem("token");

      const res = await axios.post(
        "https://content-craft-server-696839166197.us-central1.run.app/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      dispatch(onLogin(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin", replace);
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow-md space-y-4"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center">Login</h2>

      {errors.general && (
        <div className="text-red-500 text-sm">{errors.general}</div>
      )}

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.email && (
          <div className="text-red-500 text-xs mt-1">{errors.email}</div>
        )}
      </div>

      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.password && (
          <div className="text-red-500 text-xs mt-1">{errors.password}</div>
        )}
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
        Login
      </button>

      <p className="text-center text-sm">
        Don't have an Account?{" "}
        <Link to="/auth/register">
          <span className="text-blue-600 underline">Register</span>
        </Link>
      </p>
    </form>
  );
};

export default Login;
