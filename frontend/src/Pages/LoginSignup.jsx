import React, { useState } from 'react';
import './css/loginsignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    let responseData;
    const endpoint = state === "Login" ? 'http://localhost:4000/login' : 'http://localhost:4000/signup';

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        // Redirect or navigate to another page using React Router
        // Example: history.push('/')
        window.location.replace("/");
      } else {
        setError(responseData.errors || "Unknown error occurred");
      }
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='loginsignup-popup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your name' />}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={handleFormSubmit}>Continue</button>
        {state === "Sign Up" ?
          <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login"); setError(""); }}>Login here</span></p>
          :
          <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up"); setError(""); }}>Click here</span></p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
