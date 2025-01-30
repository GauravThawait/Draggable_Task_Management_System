import React, { useState } from "react";
import api from "../../utils/axios";
import CustomInput from "../../components/InputBox/Custominput";
import { toast } from "react-toastify";
import CustomCard from "../../components/customCard/CustomCard";
import CustomButton from "../../components/customButton/CustomButton";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Sending reset email...");

    try {
      const response = await api.post("/api/v1/user/email-reset-password", { email: formData.email });
      toast.update(loadingToast, {
        render: response.data.message, // Success message from API
        type: "success",
        isLoading: false,
        autoClose: 3000, // Auto-close after 3 seconds
      });
      setStep(2); // Move to OTP step
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.update(loadingToast, {
        render: `Error: ${errorMessage}`,
        type: "error",
        isLoading: false,
        autoClose: 4000, // Auto-close after 4 seconds
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const response = await api.post("/api/v1/user/verify-otp", { email: formData.email, otp: formData.otp });
      toast.update(loadingToast, {
        render: response.data.message, // Success message from API
        type: "success",
        isLoading: false,
        autoClose: 3000, // Auto-close after 3 seconds
      });
      setStep(3); // Move to password reset step
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.update(loadingToast, {
        render: `Error: ${errorMessage}`,
        type: "error",
        isLoading: false,
        autoClose: 4000, // Auto-close after 4 seconds
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const loadingToast = toast.loading("Resetting password...");

    try {
      const response = await api.post("/api/v1/user/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      toast.update(loadingToast, {
        render: response.data.message, // Success message from API
        type: "success",
        isLoading: false,
        autoClose: 3000, // Auto-close after 3 seconds
      });
      setStep(1); // Reset the form after success
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.update(loadingToast, {
        render: `Error: ${errorMessage}`,
        type: "error",
        isLoading: false,
        autoClose: 4000, // Auto-close after 4 seconds
      });
    }
  };

  return (
    <CustomCard>
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Forgot Password</h2>
      <p style={{ textAlign: "center", marginBottom: "1rem", opacity: "0.5" }}>
        {step === 1 && "Enter your email"}
        {step === 2 && "Enter the OTP sent to your email"}
        {step === 3 && "Enter your new password"}
      </p>
      <form onSubmit={step === 1 ? handleEmailSubmit : step === 2 ? handleOtpSubmit : handlePasswordSubmit}>
        {step === 1 && (
          <>
            <CustomInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <CustomButton label="Send OTP" type="submit" />
          </>
        )}
        {step === 2 && (
          <>
            <CustomInput
              label="OTP"
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter the OTP"
            />
            <CustomButton label="Verify OTP" type="submit" />
          </>
        )}
        {step === 3 && (
          <>
            <CustomInput
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
            />
            <CustomInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
            />
            <CustomButton label="Reset Password" type="submit" />
          </>
        )}
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Remembered your password?{" "}
        <Link to="/login" style={{ color: "black", textDecoration: "underline" }}>
          Log In
        </Link>
      </p>
    </CustomCard>
  );
};

export default Forgotpassword;
