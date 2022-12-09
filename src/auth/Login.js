import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";

function Login() {
  const { setUserEmail, setUserId } = useContext(UserContext);

  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:2000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();
      localStorage.setItem("loggedEmail", data?.userSession?.email);
      localStorage.setItem("loggedUserId", data?.userSession?.user_id);

      await setUserEmail(data?.userSession?.email);
      await setUserId(data?.userSession?.user_id);
      console.log("Login Response", { data });

      if (data.msg == "You have logged in successfully") {
        navigate("/home");
      }

      // this is just a visual feedback for user for this demo
      // this will not be an error, rather we will show a different UI or redirect user to dashboard

      setValues({
        email: "",
        password: "",
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="register_heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form_center">
          <input
            className="input_box"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange("email")}
          />

          <br />
          <br />

          <input
            className="input_box"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange("password")}
          />
        </div>

        <br />
        <div className="button_div">
          <button
            className="submit_btn"
            type="submit"
            // onClick={setOTPChange}
          >
            Submit
          </button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <RouterLink to="/register" className="link_reg">
            Register
          </RouterLink>
        </div>
      </form>
    </>
  );
}

export default Login;
