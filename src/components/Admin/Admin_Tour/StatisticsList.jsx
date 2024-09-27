import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './CSS.css'
const StatisticsList = () => {
  const [statistics, setStatistics] = useState([]);
  const [selectedStatistic, setSelectedStatistic] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch all statistics from the backend
    axios.get('https://www.tripwaly.com/api/statistic/get')
      .then(response => setStatistics(response.data))
      .catch(error => console.error('Error fetching statistics:', error));
  }, []);

  const handleUpdateClick = (statistic) => {
    setSelectedStatistic(statistic); // Store the entire statistic object
    setShowModal(true); // Open modal
  };

  const handleInputChange = (e) => {
    setSelectedStatistic({
      ...selectedStatistic,
      [e.target.name]: e.target.value, // Dynamically update the fields
    });
  };

  const handleUpdateSubmit = () => {
    // Call backend to update the selected statistic
    axios.put(`https://www.tripwaly.com/api/statistic/update/${selectedStatistic._id}`, selectedStatistic)
      .then(response => {
        setShowModal(false);
        // Optionally, update the statistics list after a successful update
        setStatistics(statistics.map(stat => stat._id === response.data._id ? response.data : stat));
      })
      .catch(error => console.error('Error updating statistic:', error));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {statistics.map((statistic) => (
          <div key={statistic._id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{statistic.message}</h5>
                <p className="card-text">Trips: {statistic.successfulTrips}</p>
                <p className="card-text">Clients: {statistic.regularClients}</p>
                <p className="card-text">Years Experience: {statistic.yearsExperience}</p>
                <button className="btn btn-warning text-white" style={{background:'rgb(250,169,53)'}}
                 onClick={() => handleUpdateClick(statistic)}>Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    {/* Bootstrap Modal */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Statistic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Message:</label>
            <input
              type="text"
              name="message"
              className="form-control input-focus"
              value={selectedStatistic.message}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Successful Trips:</label>
            <input
              type="number"
              name="successfulTrips"
              className="form-control input-focus"
              value={selectedStatistic.successfulTrips}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Regular Clients:</label>
            <input
              type="number"
              name="regularClients"
              className="form-control input-focus"
              value={selectedStatistic.regularClients}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Years Experience:</label>
            <input
              type="number"
              name="yearsExperience"
              className="form-control input-focus"
              value={selectedStatistic.yearsExperience}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="warning"
            style={{ background: 'rgb(250,169,53)' }}
            onClick={handleUpdateSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
        );
};

export default StatisticsList;
