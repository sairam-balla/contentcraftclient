import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Saved from "./pages/Saved";
import Admin from "./pages/Admin";
import CheckAuth from "./components/checkAuth";
import NotFound from "./pages/NotFound";
import UserLayout from "./components/userLayout";
import Profile from "./pages/profile";
import AuthLayout from "./components/AuthLayout";
import Credits from "./pages/Credits";
import PostDetails from "./pages/PostDetails";
import AdminLayout from "./components/AdminLayout";
import AdminReports from "./pages/AdminReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckAuth />}></Route>
        <Route
          path="/auth"
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/user"
          element={
            <CheckAuth>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Feed />} />
          <Route path="feed/:id" element={<PostDetails />} />
          <Route path="saved" element={<Saved />} />
          <Route path="credits" element={<Credits />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Admin />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
