import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { LoginContext } from '../context/context'; // Adjust the import path as necessary

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    photo: null
  });
  const [error,setError]=useState("")
  const [isHide, setHide] = useState(true);
  const navigate = useNavigate();
  const { setLogged } = useContext(LoginContext); // Access setLogged from LoginContext

  const handleCheckbox = () => {
    setHide((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      photo: e.target.files[0]
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3001/user/register";
    
    if (userDetails.username && userDetails.password && userDetails.email && userDetails.phoneNumber) {
      if(userDetails.password.length>=6){
      const formData = new FormData();

      formData.append('username', userDetails.username);
      formData.append('password', userDetails.password);
      formData.append('email', userDetails.email);
      formData.append('phoneNumber', userDetails.phoneNumber);
      formData.append('photo', userDetails.photo);

      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response data:', response);
        if (response.status === 201 || response.status === 200) {
          setLogged(true);
          console.log('Navigating to login page...');
          navigate('/login');
        } else {
          console.error('Unexpected response status:', response.data,);
          
        }
      } catch (error) {
        console.log(error)
        console.log(error.response.data.error_msg)
        const error_message=error.response.data.error_msg;
        if(error_message.includes("duplicate key error") && (error_message.includes("email"))){
          setError("Email already exists. Please use a different email.");
        }
        
      }
    }else{
      alert("Password should contain atleast 6 letters")
    }
    } else {
      alert("Enter all the details");
    }
  };
  console.log(error,'error messsage from state')
  return (
    <div className="login-container">
      <form className='login-mobile-container' onSubmit={registerUser}>
        <h1 className='general-text' style={{ textAlign: "center", marginTop: "50px" }}>Grab & Go</h1>
        
        <input
          type='email'
          name='email'
          style={{ marginTop: "50px" }}
          placeholder='Email'
          className='login-input p-2'
          value={userDetails.email}
          onChange={handleChange}
        />

        <input
          type='number'
          name='phoneNumber'
          placeholder='Mobile Number'
          className='login-input'
          value={userDetails.phoneNumber}
          onChange={handleChange}
        />
        <br />

        <input
          type='text'
          name='username'
          placeholder='Username'
          className='login-input'
          value={userDetails.username}
          onChange={handleChange}
        />
        <br />

        {isHide ? (
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='login-input'
            value={userDetails.password}
            onChange={handleChange}
          />
        ) : (
          <input
            type='text'
            name='password'
            placeholder='Password'
            className='login-input'
            value={userDetails.password}
            onChange={handleChange}
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

        <input
          type="file"
          name="photo"
          className="login-input"
          onChange={handleFileChange}
        />
        <div>
          {error&&(
            <p style={{color:"red",fontFamily:"Roboto"}}>{error}</p>
          )}
        </div>
        <button className='btn login-button' style={{marginTop:"0px"}} type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
