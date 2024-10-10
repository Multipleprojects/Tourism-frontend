import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingDetails = () => {
  const [bookingData, setBookingData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  
  // Fetch data from the backend
  const fetchBookingData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/booking/get'); // Replace with your API endpoint
      setBookingData(response.data);
      console.log('Booking data fetched successfully!');
    } catch (error) {
      toast.error('Failed to fetch booking data.'); // Error toast
    }
  };

  // Handle modal open for editing a booking
  const handleShow = (booking) => {
    setCurrentBooking(booking);
    setShowModal(true);
  };

  // Handle modal close
  const handleClose = () => {
    setShowModal(false);
    setCurrentBooking(null);
  };

  // Update booking details
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { bookingDate, numOfPersons, totalCharges, comments, approved, number, kid, adult, elder } = e.target.elements;

    try {
      const response = await axios.put(`http://localhost:8000/api/user/booking/update/${currentBooking._id}`, {
        bookingDate: bookingDate.value,
        numOfPersons: numOfPersons.value,
        totalCharges: totalCharges.value,
        comments: comments.value,
        approved: approved.value === 'true',
        number: number.value,
        kid: kid.value,
        adult: adult.value,
        elder: elder.value,
      });

      setBookingData((prev) => prev.map((b) => (b._id === currentBooking._id ? response.data : b))); // Update local state
      toast.success('Booking updated successfully!'); // Success toast
      handleClose(); // Close modal
    } catch (error) {
      toast.error('Failed to update booking.'); // Error toast
    }
  };

  // Delete booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/booking/delete/${id}`);
      setBookingData((prev) => prev.filter((booking) => booking._id !== id)); // Update local state
      toast.success('Booking deleted successfully!'); // Success toast
    } catch (error) {
      toast.error('Failed to delete booking.'); // Error toast
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  return (
    <div className="container">
      <ToastContainer /> {/* Toast container for notifications */}
      <h2 className="mt-4">Booking Details</h2>
      {bookingData.length === 0 ? (
        <p>No booking data available.</p>
      ) : (
        <ul className="list-group mt-3">
          {bookingData.map((booking) => (
            <li key={booking._id} className="list-group-item">
              <p><strong>Full Name:</strong> {booking.fullname}</p>
              <p><strong>Email:</strong> {booking.user.email}</p>
              <p><strong>Phone Number:</strong> {booking.number}</p>
              <p><strong>Total Charges:</strong> {booking.totalCharges}</p>
              <p><strong>Number of Persons:</strong> {booking.numOfPersons}</p>
              <p><strong>Number of Kids:</strong> {booking.kid}</p>
              <p><strong>Number of Adults:</strong> {booking.adult}</p>
              <p><strong>Number of Elders:</strong> {booking.elder}</p>
              <p><strong>Approved:</strong> {booking.approved ? 'True' : 'False'}</p>
              <Button variant="primary" onClick={() => handleShow(booking)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(booking._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Editing Booking */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentBooking && (
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="approved">
                <Form.Label>Approved</Form.Label>
                <Form.Control as="select" defaultValue={currentBooking.approved.toString()} required>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">Update Booking</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingDetails;
