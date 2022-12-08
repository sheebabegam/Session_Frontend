import { useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

import { UserContext } from "./Context";

const ProtectedRoute = ({ userData, redirectPath = "" }) => {
  if (userData) {
    return <>Being refresh...</>;
  }
  return <Outlet />;
};
function RoutesComp() {
  const { userEmail } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={<ProtectedRoute userData={userEmail} redirectPath={""} />}
        >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default RoutesComp;
