import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signin.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";
      const response = await fetch(`${API_URL}signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signin successful!");
        localStorage.setItem("token", data.token); // Store JWT token
        navigate("/Profile"); // Redirect to Profile page
      } else {
        console.error("Signin failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bodysignin">
      <form onSubmit={handleSubmit}>
        <div className="containersignin">
          <div className="input-groupsignin">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
