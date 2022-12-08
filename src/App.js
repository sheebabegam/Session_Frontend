import React, { useState, useEffect } from "react";
import Register from "./auth/Register";
import Login from "./auth/Login";
import RoutesComp from "./auth/Protected";
import Home from "./auth/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "./auth/Context";

function App() {
  const [loading, setLoading] = useState(false);
  const [userSession, setUserSession] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const ContextValues = {
    userSession,
    setUserSession,
    userEmail,
    setUserEmail,
    userId,
    setUserId,
  };

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/isAuth");
        if (!res.ok) {
          localStorage.clear();
          navigate("/");
          return setLoading(false);
        }

        setUserSession(await res.json());
        setUserEmail(localStorage.getItem("loggedEmail"));
        setUserId(localStorage.getItem("loggedUserId"));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("There was an error fetch auth", error);
        return;
      }
    };
    fetchUserAuth();
  }, []);
  return (
    <div className="App">
      <UserContextProvider value={ContextValues}>
        <RoutesComp />
      </UserContextProvider>
    </div>
  );
}

export default App;
