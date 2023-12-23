import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { SERVER_URL } from "./constants";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
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
    axios.post(`${SERVER_URL}/login`,formData)
    .then((resp) => {
        localStorage.setItem("UserData",JSON.stringify({...resp.data}))
        navigate("/dashboard")
    })
    .catch((err) => {
        alert(err)
    })
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

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          {/* Button to navigate to the Register page */}
          <Link to="/register" className="btn btn-secondary ms-2">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
