import { useState } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { BackgroundContainer } from './styledLogin';
import dosaLogin from '../../images/loginImages/dosaLogin.jpg';
import burgerLogin from '../../images/loginImages/burgerLogin.jpg';
import venpongalLogin from '../../images/loginImages/venpongalLogin.jpeg';
import './login.css';

const Login = ({ setLogged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHide, setHide] = useState(true);

  const images = [
    { url: dosaLogin, title: "Hungry for a crispy dosa?" },
    { url: burgerLogin, title: "Craving a juicy burger break?!" },
    { url: venpongalLogin, title: "Need a warm ven pongal boost?" }
  ];

  const handleCheckbox = () => {
    setHide((prev) => !prev);
  };



  return (
    <div className="login-container">
      <form className='login-mobile-container'>
        <h1 className='general-text' style={{textAlign:"center",marginTop:"80px"}}>Grab & Go</h1>
        <input
            type='text'
            style={{marginTop:"70px",width:"270px",marginBottom:"40px"}}
            placeholder='Username'
            className='login-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          {isHide ? (
            <input
              type='password'
              placeholder='Password'
              className='login-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          ) : (
            <input
              type='text'
              placeholder='Password'
              className='login-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button className='btn login-button'>Login</button>
        <div className='d-flex flex-diretion-row justify-content-between mt-5'>
            <lable for="register ">Don't Have Account?</lable>
            <button style={{background:"transparent",border:"transparent",fontWeight:"bold"}} ><a style={{textDecoration:"none",color:"black"}} href="/register">Sign In {">"}</a></button>

        </div>
      </form>
    </div>
  );
};

export default Login;
