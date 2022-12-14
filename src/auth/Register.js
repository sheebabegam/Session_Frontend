import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().strict().trim().required("this field required"),
      email: yup
        .string()
        .email("Enter valid email id")
        .strict()
        .trim()
        .required("this field required"),
      password: yup.string().strict().trim().required("this field required"),
      // confirmpassword: yup
      //   .string()
      //   .oneOf([yup.ref("password"), null, "must be same"])
      //   .required("this field is required"),
    }),

    onSubmit: (data) => {
      console.log("My data is ---->", data);
      axios
        .post("http://localhost:2000/api/register", data)
        .then((res) => {
          toast.success("User register successfully!");
          navigate("/");
        })
        .catch((err) => {
          // toast.error(err.response.data);
        });
      // toast.success("Success Notification!", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    },
  });

  return (
    <div>
      <h1 className="register_heading"> Register</h1>
      <form noValidate>
        <div className="form_row">
          <label htmlFor="name" className="input_label">
            Name
          </label>
          <input
            type="username"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.name ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.name}
            </div>
          ) : null}
        </div>{" "}
        <br />
        <div className="form_row">
          <label htmlFor="email" className="input_label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.email ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.email}
            </div>
          ) : null}
        </div>{" "}
        <br />
        <div className="form_row">
          <label htmlFor="password" className="input_label">
            Password
          </label>
          <input
            type="password"
            password="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.password ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.password}
            </div>
          ) : null}
        </div>{" "}
        <br />
        {/* <div className="form_row">
          <label htmlFor="confirmpassword" className="input_label">
            confirm Password
          </label>
          <input
            type="password"
            confirmpassword="confirmpassword"
            id="confirmpassword"
            value={formik.confirmpassword}
            onChange={formik.handleChange}
            className="input_box"
          />{" "}
          <br />
          {formik.errors.confirmpassword ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.confirmpassword}
            </div>
          ) : null}
        </div>{" "} */}
        <br />
        <br />
        <br />
        <div className="button_div">
          <button
            type="submit"
            className="submit_btn"
            onClick={formik.handleSubmit}
          >
            Sign In
          </button>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a
            href="#"
            onClick={() => {
              window.location.href = "login";
            }}
            className="link_login"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
