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
const User_Register = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [previewImage, setPreviewImage] = useState(userIcon);
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setCredentials((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Check if a file is selected
    if (!selectedFile) {
      toast.error("Please select a profile image");
      return;
    }
  
    if (!credentials.phone || credentials.phone.length < 11) {
      toast.error("Phone number must contain at least 11 digits");
      return;
    }
  
    if (!credentials.password || credentials.password.length <= 6) {
      toast.error("Password must contain more than 6 characters");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", credentials.username);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("phone", credentials.phone);
    if (selectedFile) {
      formData.append("images", selectedFile);
    }
  
    try {
      const res = await axios.post(`https://www.tripwaly.com/api/user/create`, formData);
      toast.success(res.data); // Show success message
      navigate("/user/login");
    } catch (error) {
      toast.error(error.response?.data || "Error creating account. Please try again.");
    }
  };
  
 

  const handleImageClick = () => {
    document.getElementById("profileImageInput").click();
  };
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set the preview image as a base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      setSelectedFile(file); // Store the selected file
    }
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
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2 className="p-0 m-2 pb-4 m-lg-0 m-md-0 m-lg-m-0">Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <div className="text-center">
                      <img
                        src={previewImage}
                        height="100px"
                        width="100px"
                        alt="Profile Preview"
                        onClick={handleImageClick}
                       
                     style={{ cursor: "pointer", borderRadius: "50%", objectFit: "cover",cursor: "pointer" }}
  
                    />
                      <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*"
                        style={{ display: "none" }} // Hide the actual file input      
                   onChange={fileChangeHandler}
                  
            
          />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
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
                    <div className="password__input">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                        required
                        onChange={handleChange}
                      />
                      </div>
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Phone Number"
                      id="phone"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Create Account
                  </Button>
                </Form>

                <p>
                  Already have an account? <Link to="/user/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default User_Register;
