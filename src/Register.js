import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./constants";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    balance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.balance = parseFloat(formData.balance)
    axios
      .post(`${SERVER_URL}/register`, formData)
      .then(() => {
        alert("Registration Successful")
        navigate("/")
      })
      .catch((err) => {
        alert("Server Error");
      });
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-3"
        style={{ maxWidth: "400px", margin: "auto", border: "1px solid #ccc" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="balance" className="form-label">
              Balance
            </label>
            <input
              type="text"
              className="form-control"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="Enter your balance"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;