import React, { useState } from "react";
import api from "../../utils/axios";
import CustomInput from "../../components/InputBox/Custominput";
import { toast } from "react-toastify";
import CustomCard from "../../components/customCard/CustomCard";
import CustomButton from "../../components/customButton/CustomButton";
import { Link } from "react-router-dom";
import { store_token } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate=  useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Logging User......");

    try {
      const response = await api.post("/api/v1/user/signin", formData);

      if (response.data) {
        console.log(response.data)
        store_token(response.data.data.token);
      }

      toast.update(loadingToast, {
        render: response.data.message, // Success message from API
        type: "success",
        isLoading: false,
        autoClose: 3000, // Auto-close after 3 seconds
      });

      console.log("starting navigation to /task")
      navigate('/tasks');
      console.log("done navigation to /task")

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      // Update toast to error
      toast.update(loadingToast, {
        render: `Error: ${errorMessage}`,
        type: "error",
        isLoading: false,
        autoClose: 4000, // Auto-close after 3 seconds
      });
    }
  };

  return (
    <CustomCard>
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Sign In</h2>
      <p style={{ textAlign: "center", marginBottom: "1rem", opacity: "0.5" }}>
        Enter your information to signin
      </p>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <CustomInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <CustomButton label="Login" type="submit" />
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "black", textDecoration: "underline" }}
          >
            Sign Up
          </Link>
        </p>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Reset your password?{" "}
          <Link
            to="/forgotpassword"
            style={{ color: "black", textDecoration: "underline" }}
          >
            Reset Now
          </Link>
        </p>
      </form>
    </CustomCard>
  );
};

export default Login;
