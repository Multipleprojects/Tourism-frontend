import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "../styles/login.css";
import registerImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { useNavigate } from "react-router-dom";
const Company_Register = () => {
const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyAddress: "",
    description: "",
  active:false
  });

  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (!credentials.phoneNumber || credentials.phoneNumber.length < 11) {
      toast.error("Phone number must contain at least 11 digits");
      return;
    }
  
    if (!credentials.password || credentials.password.length <= 6) {
      toast.error("Password must contain more than 6 characters");
      return;
    }

    try {
      const res = await axios.post(`https://www.tripwaly.com/api/company/create`, credentials);
      toast.success(res.data); // Show success message
    navigate('/company/login')
    } catch (error) {
      toast.error(
        error.response?.data || "Error creating company. Please try again."
      );
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <section>
      <ToastContainer />
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user mt-4">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Company</h2>
                <Form onSubmit={handleClick}>

                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Your Name"
                      id="name"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Company Name"
                      id="companyName"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Company Email"
                      id="email"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <div className="password__input">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                        required
                        onChange={handleChange}
                      />
                      {/* <span
                        className="password__toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </span>  */}
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      id="phoneNumber"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Company Address"
                      id="companyAddress"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                  <textarea
  className="pl-2 rounded"
  placeholder="Description (optional)"
  id="description"
  onChange={handleChange}
  cols="28"
  rows="5"
  style={{ padding: "10px" }}
/>
                  </FormGroup>

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Create Company Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/company/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Company_Register;
