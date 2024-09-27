import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const Touroperator = () => {
  const [touroperators, setTouroperators] = useState([]); // List of tour operators
  const [selectedTouroperator, setSelectedTouroperator] = useState(null); // Selected tour operator
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    // Fetch all tour operators from the backend
    axios.get('https://www.tripwaly.com/api/touroperator/get') // Replace with your actual API endpoint
      .then(response => setTouroperators(response.data))
      .catch(error => console.error('Error fetching touroperators:', error));
  }, []);

  // Handle the click to update an operator, open modal and set the selected operator
  const handleUpdateClick = (id) => {
    const operatorToUpdate = touroperators.find(touroperator => touroperator._id === id);
    setSelectedTouroperator(operatorToUpdate); // Set the selected tour operator
    setShowModal(true); // Open the modal
  };

  const handleInputChange = (e) => {
    setSelectedTouroperator({
      ...selectedTouroperator,
      [e.target.name]: e.target.value, // Dynamically update the field
    });
  };

  const handleUpdateSubmit = () => {
    // Update the selected tour operator
    axios.put(`https://www.tripwaly.com/api/touroperator/update/${selectedTouroperator._id}`, {
      description: selectedTouroperator.description,
    })
      .then(response => {
        setShowModal(false);
        // Optionally, update the tour operators list with the updated data
        setTouroperators(touroperators.map(touroperator => 
          touroperator._id === response.data._id ? response.data : touroperator
        ));
      })
      .catch(error => console.error('Error updating touroperator:', error));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {touroperators.map((touroperator) => (
          <div className="col-md-4 mb-3" key={touroperator._id}>
            <div className="card h-100">
              <div className="card-body">
                <p className="card-title">{touroperator.description}</p>
                <Button className="btn btn-warning text-white" style={{background:'rgb(250,169,53)'}} onClick={() => handleUpdateClick(touroperator._id)}>
                  Update
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing a tour operator */}
      {showModal && selectedTouroperator && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Tour Operator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className='input-focus'
                  name="description"
                  value={selectedTouroperator.description || ''} // Default to an empty string if undefined
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button className="btn btn-warning text-white" style={{background:'rgb(250,169,53)'}} onClick={handleUpdateSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Touroperator;
