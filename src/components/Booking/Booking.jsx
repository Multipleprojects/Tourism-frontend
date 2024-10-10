import React, { useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Booking = ({ tourid, tourscheduleid, avgRating, tour }) => {
  const userid = useSelector((state) => state.auth.login._id);
  const navigate = useNavigate();
  const { price } = tour;

  const [credentials, setCredentials] = useState({
    tourseats: tourid,
    user: userid,
    tour: tourscheduleid,
    bookingDate: '',
    numOfPersons: 0, // Total paying persons
    totalCharges: 0,
    kid: 0,
    adult: 0,
    elder: 0,
    number: '',
    fullname: '',
  number:''
  });
  const serviceFeePerPerson = 10;

  // Update fields and recalculate totalCharges and numOfPersons
  const handleChange = (e) => {
    const { id, value } = e.target;
  
    // Handle validation only for 'adult' and 'elder'
    if (id === 'adult' || id === 'elder') {
      const updatedValue = parseInt(value, 10);
  
      // Ensure values are greater than or equal to 0
      if (updatedValue < 0 || isNaN(updatedValue)) {
        toast.error(`${id} must be greater than or equal to 0`);
        return;
      }
  
      setCredentials((prev) => {
        const updatedCredentials = { ...prev, [id]: updatedValue };
  
        // Recalculate numOfPersons and total charges for adults and elders
        const newTotalPersons = updatedCredentials.adult + updatedCredentials.elder;
        const totalServiceFee = newTotalPersons * serviceFeePerPerson;
  
        updatedCredentials.numOfPersons = newTotalPersons; // Only adults and elders
        updatedCredentials.totalCharges = newTotalPersons * price + totalServiceFee; // Calculate total charges
  
        return updatedCredentials;
      });
    } else {
      // Update other fields normally (without numeric validation)
      setCredentials((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };
  
  const handleClick = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You need to login first to book a tour.");
      navigate("/user/login");
      return;
    }
if (!credentials.number || credentials.number.length >= 11) {
      toast.error("Phone number must contain at least 11 digits");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/user/booking/create", credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success(`${response.data.message}. Available seats left: ${response.data.availableSeats}`);
      navigate("/thank-you");

    } catch (error) {
      console.error("Error: ", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="booking">
        <div className="booking__form">
          <h5>Booking Information</h5>
          <Form className="booking__info-form" onSubmit={handleClick}>
            <FormGroup>
              <input
                type="text"
                placeholder="Full Name"
                id="fullname"
                required
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <input
                type="number"
                placeholder="Phone"
                id="number"
                required
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="d-flex align-items-center gap-3">
              <input
                type="date"
                id="bookingDate"
                required
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <input
                type="number"
                placeholder="Number of Kids"
                id="kid"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <input
                type="number"
                placeholder="Number of Adults"
                id="adult"
                required
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <input
                type="number"
                placeholder="Number of Elders"
                id="elder"
                required
                onChange={handleChange}
              />
            </FormGroup>

            <Button className="btn primary__btn w-100 mt-4" type="submit">
              Book Now
            </Button>
          </Form>
        </div>

        <div className="booking__bottom">
          <ListGroup>
            <ListGroupItem className="border-0 pc-0">
              <h5 className="d-flex align-items-center gap-1">
                Rs {price} <i className="ri-close-line"></i> {(credentials.adult || 0) + (credentials.elder || 0)} paying persons
              </h5>
              <span> Rs {(credentials.adult + credentials.elder) * price} </span>
            </ListGroupItem>

            <ListGroupItem className="border-0 pc-0">
              <h5>Service Charges</h5>
              <span> Rs {(credentials.adult + credentials.elder) * serviceFeePerPerson} </span>
            </ListGroupItem>

            <ListGroupItem className="total border-0 pc-0">
              <h5>Total</h5>
              <span> Rs {credentials.totalCharges} </span>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default Booking;
