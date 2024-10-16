// src/components/Login.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setLogin } from '../components/Redux Toolkit/authSlice';
import axios from 'axios'; // Import axios for API calls
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../App.css'
const Company_Login = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  // Opens the Forgot Password Modal
  const openForgotPasswordModal = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (credentials.email === '' || credentials.password === '') {
      toast.error("Please enter your email and provide the last character of your password");
      return;
    }

    if (!emailRegex.test(credentials.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/company/login', credentials);
      toast.error("Given email and password are correct click Login button")
    
    } catch (error) {
      if (error.response && error.response.data.message === 'Invalid password') {
        setUserId(error.response.data.id); // Retrieve user ID from the error response
        setIsModalOpen(true); // Open modal
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  // Closes the Forgot Password Modal
  const closeForgotPasswordModal = () => {
    setIsModalOpen(false);
    setNewPassword(''); // Clear the new password field
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const resCompany = await axios.post(`http://localhost:8000/api/company/login`, credentials);
      const { message: userMessage, token: userToken } = resCompany.data;
        // Store token in localStorage
        localStorage.setItem('authToken', userToken);  
        // Dispatch the token to Redux
        dispatch(setToken(userToken));
        dispatch(setLogin(resCompany.data.company))
        // Show success toast
        toast.success(userMessage);
        if(resCompany.data.company.active===true)
          {
          navigate('/company/dashboard');
       
          }
          else{
            navigate('/not-eligible')
      
          }
        // Redirect to user home dashboard
        
    } catch (error) {
      if (error.response?.data.message === "Invalid password") {
        setUserId(error.response?.data.id);
        toast.error('Invalid password');
      } else {
        toast.error(error.response?.data.message || "Login failed. Please check your credentials.");
      }
    }
  };
      // Handles updating the password
      const handlePasswordUpdate = async () => {
        if (newPassword === '') {
          toast.error('Please enter a new password.');
          return;
        }
        // Password validation: At least 6 characters and contains at least one number
  const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6,}$/; 
  if (!passwordRegex.test(credentials.password)) {
    toast.error("Password must be at least 6 characters long and contain at least one number.");
    return;
  }
        try {
          await axios.put(`http://localhost:8000/api/company/updatepassword/${userId}`, { password: newPassword });
          toast.success('Password updated successfully.');
          closeForgotPasswordModal(); // Close the modal after success
        } catch (error) {
          toast.error('Failed to update password.');
    console.log("userid",userId)
        }
      };
        
  
  return (
    <section>
      <Container>
      <ToastContainer />
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>

                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      required
                      onChange={handleChange}
                    />
             <a
                            onClick={openForgotPasswordModal}
                            style={{ textDecoration: 'underline', cursor: 'pointer', float:'right' }}
                          className='text-dark mb-3'
                          >
                            Forgot Password?
                          </a>
       
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                Login
                   </Button>
               
                                </Form>

                <p className="account-prompt">
                  Don't have an account?
                  <Link to="/company/register"><br />Create as Company</Link> today.
                </p>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
      {isModalOpen && userId && (
          <div className="modal p-4" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" style={{color:'rgb(250,169,53)'}}>Update Password</h5>
                </div>
                <div className="modal-body">
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      borderColor: 'rgb(8,124,128)',
                      outline: 'none',
                      width: '100%',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'black';
                      e.target.style.boxShadow = 'none';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(8,124,128)';
                    }}
     
                  />
                    <label className="form-label" htmlFor="form3Example4c">
                        Enter New Pasword
                            </label>
                        
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn  btn btn-secondary" onClick={closeForgotPasswordModal}>
                    Cancel
                  </button>
                  <button type="button" 
                                         className="btn  text-white"
                            style={{
                              backgroundColor: 'rgb(250,169,53)',
                            }}
      onClick={handlePasswordUpdate}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

    </section>
  );
};

export default Company_Login;
