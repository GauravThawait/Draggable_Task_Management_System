import React, { useState } from "react";
import api from "../../utils/axios";
import CustomInput from "../../components/InputBox/Custominput"
import { toast } from "react-toastify";
import CustomCard from "../../components/customCard/CustomCard";
import CustomButton from "../../components/customButton/CustomButton";
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: ""
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Registering User......")

    try {
      const response = await api.post("/api/v1/user/signup", formData);
      toast.update(loadingToast, {
        render: response.data.message, // Success message from API
        type: "success",
        isLoading: false,
        autoClose: 3000, // Auto-close after 3 seconds
      });

      navigate("/login")
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
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Sign Up</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem', opacity: "0.5" }}>Enter your information to create an account</p>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
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
        <CustomButton label="Create an account" type="submit" />
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "black", textDecoration: "underline" }}>
            Sign In
          </Link>
        </p>
      </form>
    </CustomCard>
  );
};

export default Register;
