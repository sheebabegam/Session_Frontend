import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./Context";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";

function Home(props) {
  const navigate = useNavigate();
  const { userEmail, userId } = useContext(UserContext);

  const [timer, setTimer] = useState(0);
  setTimeout(() => {
    setTimer(timer + 1);
  }, 1000);

  setTimeout(() => {
    logout();
  }, 10000);

  const on_logout = async () => {
    axios
      .delete("http://localhost:2000/api/logout", userEmail)
      .then((res) => {
        if (!res.data) {
          alert("Err occured in logout");
          return;
        }
        toast.success("Logout Successfully!");
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        // toast.error(err.response.data);
      });
  };

  const logout = () => {
    // if (timer === "BOOOOM!") {
    on_logout();
    // }
  };
  return (
    <div className="center_content">
      <div>Seesion Time 10secs - {timer}</div>
      <h2>Welcome {userEmail}</h2>
      <h3>userID: {userId}</h3>
      {/* {timer === "BOOOOM!" && ( */}
      <div>
        <button
          variant="contained"
          onClick={() => {
            on_logout();
          }}
          className="submit_btn"
        >
          Logout
        </button>
      </div>
      {/* )} */}
    </div>
  );
}

export default Home;
