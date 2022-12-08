import React, { useContext } from "react";
import { UserContext } from "./Context";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home(props) {
  const navigate = useNavigate();
  const { userEmail, userId } = useContext(UserContext);

  console.log("User Email is ", userEmail);
  const on_logout = async () => {
    axios
      .delete("http://localhost:2000/api/logout", userEmail)
      .then((res) => {
        if (!res.ok) {
          alert("Err occured in logout");
          return;
        }
        toast.success("User register successfully!");
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        // toast.error(err.response.data);
      });
  };
  return (
    <div style={{ marginLeft: 30, marginTop: 30 }}>
      <h2>Welcome {userEmail}</h2>
      <h3>userID: {userId}</h3>
      <div>
        <button
          variant="contained"
          onClick={() => {
            on_logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
