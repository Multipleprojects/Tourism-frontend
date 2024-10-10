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
  });

  const [previewImage, setPreviewImage] = useState(userIcon);
  const [selectedFile, setSelectedFile] = useState(null);

  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setCredentials((prev) => ({ ...prev, images: file }));
    }
  };

    // Check if a file is selected
   const handleClick = async (e) => {
  e.preventDefault();
  
  // Create FormData to handle file and other form data
  const formData = new FormData();
  formData.append("name", credentials.name);
  formData.append("companyName", credentials.companyName);
  formData.append("email", credentials.email);
  formData.append("password", credentials.password);
  formData.append("phoneNumber", credentials.phoneNumber);
  formData.append("companyAddress", credentials.companyAddress);
  formData.append("description", credentials.description);

  if (selectedFile) {
    formData.append("images", selectedFile); // Attach the image file
  }

  try {
    const res = await axios.post(`http://localhost:8000/api/company/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(res.data.message); // Show success message
    navigate('/company/login');
  } catch (error) {
    toast.error(
      error.response?.data || "Error creating company. Please try again."
    );
  }
};
 
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleImageClick = () => {
    document.getElementById("imagesInput").click();
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
                <div className="user mt-4">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Company</h2>
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
                        id="imagesInput"
                        accept="image/*"
                        style={{ display: "none" }} // Hide the actual file input      
                   onChange={fileChangeHandler}
                  
            
          />
                    </div>
                  </FormGroup>

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
                        type="password"
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
                      type="number"
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
