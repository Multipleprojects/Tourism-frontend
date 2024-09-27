import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./newsletter.css";
import { backendurl } from "../config/backend";

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    try {
      // const response = await axios.post('https://www.tripwaly.com/api/user/subscription/create', { email });
      const response = await axios.post(`https://www.tripwaly.com/api/user/subscription/create`, { email });

      if (response.status === 201) {
        toast.success(response.data.message);
        setEmail(''); // Clear the email input
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section className="newsletter">
      <ToastContainer />
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>

              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  className="w-75"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn newsletter__btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>

              <p>
                Subscribe now for essential travel tips and updates, and stay informed for your next adventure.
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="Newsletter Subscription" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
