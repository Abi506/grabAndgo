import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'
import './login.css';

const Login = () => {
  const [userDetails, setUserDetails] = useState({ username: "", password: "" });
  const [isHide, setHide] = useState(true);
  const navigate = useNavigate();

  const handleCheckbox = () => {
    setHide((prev) => !prev);
  };

  const handleUserDetails = (e) => {
    setUserDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const postLogin = async (e) => {
    e.preventDefault();
    const { username, password } = userDetails;
    const body = { username, password };

    try {
      const url = "http://localhost:3001/user/login";
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      cookie.set("jwt_id",response.data.token)
      navigate("/");
    } catch (error) {
      console.log(`Error while login: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <form className='login-mobile-container' onSubmit={postLogin}>
        <h1 className='general-text' style={{ textAlign: "center", marginTop: "80px" }}>Grab & Go</h1>
        <input
          type='text'
          style={{ marginTop: "70px", width: "270px", marginBottom: "40px" }}
          placeholder='Username'
          className='login-input'
          value={userDetails.username}
          name='username'
          onChange={handleUserDetails}
        />
        <br />
        {isHide ? (
          <input
            type='password'
            placeholder='Password'
            className='login-input'
            value={userDetails.password}
            name='password'
            onChange={handleUserDetails}
          />
        ) : (
          <input
            type='text'
            placeholder='Password'
            className='login-input'
            value={userDetails.password}
            name='password'
            onChange={handleUserDetails}
          />
        )}
        <div>
          <input
            type="checkbox"
            id='checkbox'
            style={{ width: "15px", height: "12px", marginRight: "5px" }}
            onChange={handleCheckbox}
          />
          <label htmlFor='checkbox'>Show Password</label>
        </div>
        <button className='btn login-button' type="submit">Login</button>
        <div className='d-flex flex-direction-row justify-content-between mt-5'>
          <label htmlFor="register">Don't Have Account?</label>
          <button style={{ background: "transparent", border: "transparent", fontWeight: "bold" }} >
            <a style={{ textDecoration: "none", color: "black" }} href="/register">Sign In {">"}</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
