// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { onLogin } from "../store/userSlice";

// function CheckAuth({ children }) {
//   const { isAuthenticated, role } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const token = localStorage.getItem("token");
//   console.log(token);
//   if (!(token === undefined) && isAuthenticated === false) {
//     axios
//       .get("http://localhost:5000/api/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log(res.data);
//         dispatch(onLogin(res.data));
//       })
//       .then(() => <Navigate to="/user/home" />);
//   }
//   if (location.pathname === "/") {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth/login" />;
//     } else {
//       if (role === "admin") {
//         return <Navigate to="/admin" />;
//       } else {
//         return <Navigate to="/user/home" />;
//       }
//     }
//   }

//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/login") ||
//       location.pathname.includes("/register")
//     )
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/login") ||
//       location.pathname.includes("/register"))
//   ) {
//     if (role === "admin") {
//       return <Navigate to="/admin" />;
//     } else {
//       return <Navigate to="/user/home" />;
//     }
//   }

//   if (
//     isAuthenticated &&
//     role !== "admin" &&
//     location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   if (
//     isAuthenticated &&
//     role === "admin" &&
//     location.pathname.includes("user")
//   ) {
//     return <Navigate to="/admin" />;
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { onLogin } from "../store/userSlice";

function CheckAuth({ children }) {
  const { isAuthenticated, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isAuthenticated) {
      axios
        .get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(onLogin(res.data));
        })
        .catch((err) => {
          console.error("Auth fetch failed", err);
        });
    }
  }, [token, isAuthenticated, dispatch]);

  // Unauthenticated access to protected routes
  if (
    !isAuthenticated &&
    !["/auth/login", "/auth/register"].includes(location.pathname)
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Authenticated user visiting login/register
  if (
    isAuthenticated &&
    ["/auth/login", "/auth/register"].includes(location.pathname)
  ) {
    return role === "admin" ? (
      <Navigate to="/admin/home" />
    ) : (
      <Navigate to="/user/home" />
    );
  }

  // User trying to access unauthorized routes
  if (isAuthenticated) {
    if (role === "admin" && location.pathname.includes("/user")) {
      return <Navigate to="/admin/home" />;
    }
    if (role !== "admin" && location.pathname.includes("/admin")) {
      return <Navigate to="/unauth-page" />;
    }
  }

  return <>{children}</>;
}

export default CheckAuth;
