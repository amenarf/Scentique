import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { jwtDecode } from 'jwt-decode'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const RegisterReq = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };
  
    try {
      const response = await axios.post('api/register/', data);
      console.log('User registered successfully:', response.data);
      
      setMessage(response.data.message);
      setCurrState("Login");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  
  const LoginReq = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      password: formData.password
    };

    try {
      const response = await axios.post("api/login/", data);
      if (response.data.success) {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        
        // Store token and username, and close the popup
        localStorage.setItem("Token", token);
        setLoggedInUsername(decodedToken.username);
        setShowLogin(false);  // Close the popup on successful login
      }
    } catch (error) {
      setMessage("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={currState === "Sign Up" ? RegisterReq : LoginReq}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        {message && <p className="message">{message}</p>}
        <div className="login-popup-inputs">
          <input 
            name="username" 
            type="text" 
            placeholder="Username" 
            required 
            value={formData.username}
            onChange={handleChange} 
          />
          {currState === "Sign Up" && 
            <input 
              name="email" 
              type="email" 
              placeholder="Your email" 
              required 
              value={formData.email}
              onChange={handleChange} 
            />
          }
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            value={formData.password}
            onChange={handleChange} 
          />
        </div>
        {currState === "Sign Up" 
          ? <button type="submit">Create account</button> 
          : <button type="submit">Login</button>
        }
        {currState === "Sign Up" && 
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        }
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;

