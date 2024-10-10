// src/components/ResetPasswordModal.js
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = ({ isOpen, toggle }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/updatepassword', { email });
      toast.success(response.data.message);
      toggle(); // Close modal after success
    } catch (error) {
      toast.error(error.response?.data.message || "Error sending reset link");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ToastContainer />
      <ModalHeader toggle={toggle}>Reset Password</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleResetPassword}>
          <FormGroup>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Send Reset Link</Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ResetPassword;
