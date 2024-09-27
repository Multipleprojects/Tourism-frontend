// src/components/Login.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setToken, setLogin } from '../components/Redux Toolkit/authSlice';
import axios from 'axios'; // Import axios for API calls
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { backendurl } from "../config/backend";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../App.css'
const Admin_Login = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const resAdmin = await axios.post(`https://www.tripwaly.com/api/admin/login`, credentials);
      console.log('Response from login:', resAdmin.data); // Log the full response
      
      const { token: userToken, admin } = resAdmin.data;
      localStorage.setItem('token', userToken);  
      dispatch(setToken(userToken));
      dispatch(setLogin(admin));
      
      toast.success(resAdmin.data.message);
      
      if (admin.active === true) {
        navigate('/admin/dashboard');
      } else {
        navigate('/not-eligible');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message); // Log the error for debugging
      toast.error(
        error.response?.data.message || "Login failed. Please check your credentials"
      );
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
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                Login
                   </Button>
                                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Admin_Login;
