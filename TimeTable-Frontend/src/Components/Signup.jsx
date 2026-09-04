import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: ""
  });

  const navigate = useNavigate(); // To redirect user after signup

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";
      const response = await fetch(`${API_URL}signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Signup successful!");
        navigate("/Signin"); // Redirect to profile page after successful signup
      } else {
        console.error("Signup failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bodysignup">
      <form onSubmit={handleSubmit}>
        <div className="containersignup">
          <div className="input-groupsignup">
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" id="firstname" placeholder="Enter your name" required onChange={handleChange} />

            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" id="lastname" placeholder="Enter your name" required onChange={handleChange} />

            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="Enter your username" required onChange={handleChange} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter your password" required onChange={handleChange} />

            <button type="submit" className="buttonsignup">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
