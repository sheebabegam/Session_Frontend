import { useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./auth/Home";

import { UserContext } from "./auth/Context";

const ProtectedRoute = ({ userData, redirectPath = "" }) => {
  if (!userData) {
    return <>Go to Login...</>;
  }
  return <Outlet />;
};
function RoutesComp() {
  const { userEmail } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={<ProtectedRoute userData={userEmail} redirectPath={""} />}
        >
          <Route path="/home" element={<Home />} exact />
        </Route>
      </Routes>
    </>
  );
}

export default RoutesComp;
