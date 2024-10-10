import React, { useState, useRef } from 'react';
import { Container, Form, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/tour-details.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Review = ({ tourscheduleid }) => {
    const navigate=useNavigate()
    const userid=useSelector((state)=>state.auth.login._id);
const [tourRating, setTourRating] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const reviewMsgRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewMessage = reviewMsgRef.current.value;

    if (!tourRating || !reviewMessage) {
      toast.error('Please provide both a rating and a review');
      return;
    }

    const formData = new FormData();
    formData.append('user', userid); // Pass the user ID
    formData.append('tour', tourscheduleid); // Pass the tour ID
    formData.append('review', reviewMessage);
    formData.append('rating', tourRating);
    if (selectedFile) {
      formData.append('images', selectedFile);
    }

    try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (!token) {
      toast.error("You need to login first to book a tour.");
      navigate("/login");
      return;
    }
   const response = await axios.post('http://localhost:8000/api/user/review/create', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
      });

      // Handle different statuses and messages
      if (response.status === 201) {
        alert(response.data.message || 'Review submitted successfully!');
        setTourRating(0);
        reviewMsgRef.current.value = '';
        setSelectedFile(null);
      } else {
        toast.error(response.data.message || 'Failed to submit review');
      }
    } catch (error) {
      toast.error("Please log in to continue.");
    }
  };


  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <ToastContainer />
      <div className="tour__reviews mt-4">
        <h4>Reviews</h4>

        <Form onSubmit={submitHandler}>
        <div className="d-flex align-items-center gap-3 mb-4 rating__group">
        <select
  value={tourRating}
  onChange={(e) => setTourRating(Number(e.target.value))} // Convert value to a number
  className="form-select"
  required
>
  <option value="">Select Rating</option>
  {[1, 2, 3, 4, 5].map((value) => (
    <option key={value} value={value}>
      {value} Star{value > 1 ? 's' : ''}
    </option>
  ))}
</select>

      </div>

          <div className="review__input">
            <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
          </div>

          <div className="mt-3">
            <input type="file" onChange={fileChangeHandler} />
          </div>

          <button className="btn primary__btn text-white mt-3" type="submit">
            Submit
          </button>
        </Form>

         </div>
    </div>
  );
};
export default Review;
