import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendurl } from '../../../config/backend';
import { useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import Edit_Tour from './Edit_Tour';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Get_Tour = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [schedules, setSchedules] = useState([]); // Store tour schedules here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const user = useSelector((state) => state.auth.login);
  useEffect(() => {
    fetchToursAndSchedules();
  }, []);

  const fetchToursAndSchedules = async () => {
    try {
      // Fetch all tours
      const tourResponse = await axios.get(`https://www.tripwaly.com/api/tour/get`);
      setTours(tourResponse.data);  // Set the fetched tours data

      // Fetch all tour schedules
      const tourScheduleResponse = await axios.get(`https://www.tripwaly.com/api/tour/schedule/get`);
      setSchedules(tourScheduleResponse.data);  // Set the fetched schedules data
    } catch (err) {
      console.error('Error fetching tours and schedules:', err);
      toast.error('Error fetching tours and schedules');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  // Filter tours where the admin or company email matches the current user's email
  const filteredTours = tours.filter(tour => {
    const adminMatch = tour.admin && tour.admin.email === user.email;
    const companyMatch = tour.company && tour.company.email === user.email;
    return adminMatch || companyMatch;
  });

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setShowEditModal(true);
  };

  const handleClose = () => {
    setShowEditModal(false);
    setSelectedTour(null);
  };

  return (
    <div>
      <ToastContainer />
      <button className='btn btn-warning' onClick={() => navigate('/admin/dashboard/create/tour')}>Create Tour</button>
      <h1>Available Tours</h1>
      <div className="tour-list">
        {filteredTours.map(tour => {
          // Find the schedule that matches the current tour's _id
          // const matchedSchedule = schedules.find(schedule => schedule.tourid._id === tour._id);
          return (
            <Card key={tour._id} className="mb-3">
              <Card.Body>
                <Card.Title>{tour.title}</Card.Title>
                <Card.Text>{tour.description}</Card.Text>
                <Card.Text>From City: {tour.fromcity}</Card.Text>
                <Card.Text>To City: {tour.tocity}</Card.Text>
                <Card.Text>Distance: {tour.distance}</Card.Text>
                <Card.Text>Location: {tour.location}</Card.Text>
                <Card.Text>Price: {tour.price} PKR</Card.Text>
                <Card.Text>Postcode: {tour.postcode}</Card.Text>
                <Card.Text>Latitude: {tour.latitude}</Card.Text>
                <Card.Text>Longitude: {tour.longitude}</Card.Text>
                <Card.Text>Duration: {tour.duration}</Card.Text>  
                {/* Images section */}
                {tour.images && tour.images.length > 0 && (
                  <div>
                    <strong>Images:</strong>
                    <ul>
                      {tour.images.map((image, index) => (
                        <li key={index}>
                         {/* <img src={`https://www.tripwaly.com${image}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto' }} />
                */}
                          <img src={`https://www.tripwaly.com${image}`} alt={`Image ${index + 1}`} style={{ width: '100px', height: 'auto' }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Tags section */}
                {tour.tags && tour.tags.length > 0 && (
                  <div>
                    <strong>Tags:</strong>
                    <ul>
                       {tour.tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories section */}
                {tour.category && tour.category.length > 0 && (
                  <div>
                    <strong>Categories:</strong>
                    <ul>
                      {tour.category.map((cat, index) => (
                        <li key={index}>{cat.title} - {cat.description}</li>
                      ))}
                    </ul>
                    <div className="d-flex gap-4">
                  <Button variant="warning" onClick={() => handleEdit(tour)}>Edit Tour</Button>
                </div>

                  </div>

)}

                {/* Display matching tour schedule
                {matchedSchedule && (
  <div>
    <h5>Tour Schedule</h5>
    {matchedSchedule.schedules.map((schedule, index) => (
      <div key={index}>
        <p><strong>Title:</strong> {matchedSchedule._id}</p>
        
        <p><strong>Title:</strong> {schedule.title}</p>
        <p><strong>Description:</strong> {schedule.description}</p>
        <p><strong>Time:</strong> {schedule.time}</p>
        <p><strong>City:</strong> {schedule.city}</p>
        <p><strong>Latitude:</strong> {schedule.lat}</p>
        <p><strong>Longitude:</strong> {schedule.long}</p>
        {schedule.images && schedule.images.length > 0 && (
          <div>
            <strong>Schedule Images:</strong>
            {schedule.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Schedule Image ${idx + 1}`}
                style={{ width: '80px', height: 'auto', marginRight: '10px' }}
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)} */}

              </Card.Body>
            </Card>
          );
        })}
      </div>

      {selectedTour && (
        <Edit_Tour
          show={showEditModal}
          handleClose={handleClose}
          tourData={selectedTour}
          onUpdate={fetchToursAndSchedules} // Pass the update callback
        />
      )}
    </div>
  );
};

export default Get_Tour;
