import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const OffersList = () => {
  const [offers, setOffers] = useState([]); // Holds the offers
  const [selectedOffer, setSelectedOffer] = useState(null); // Holds the selected offer for editing
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the modal

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/offer/get')
      .then((response) => {
        console.log('Backend response:', response.data); // Log the full response for inspection
  
        const fetchedOffers = response.data.flatMap((offerDocument) => {
          console.log('Processing mainDoc:', offerDocument._id); // Log each main document ID
  
          return offerDocument.offers.map((offer) => ({
            ...offer,
            mainDocId: offerDocument._id, // Add the main document ID to each offer
          }));
        });
  
        console.log('Processed offers with mainDocId:', fetchedOffers); // Log the processed offers
        setOffers(fetchedOffers);
      })
      .catch((error) => console.error('Error fetching offers:', error));
  }, []);
  
  const handleUpdateClick = (offer) => {
    console.log('Selected Offer:', offer); // Log the selected offer
    if (!offer.mainDocId) {
      console.error('mainDocId is missing!');
    } else {
      console.log('MainDoc ID:', offer.mainDocId);
    }
  
    setSelectedOffer(offer); // Store the clicked offer data
    setShowModal(true); // Open the modal
  };
    // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value, // Dynamically update the offer's fields
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      // Ensure that the main document ID and the nested offer ID are both available
      console.log('Selected MainDoc ID:', selectedOffer.mainDocId);
      console.log('Selected Offer ID:', selectedOffer._id);
  
      // Construct the PUT request URL using both IDs
      const response = await axios.put(
        `http://localhost:8000/api/offer/${selectedOffer.mainDocId}/${selectedOffer._id}`,
        {
          title: selectedOffer.title,
          description: selectedOffer.description,
        }
      );
  
      // Log the response for debugging
      console.log('Update response:', response.data);
  
      // Close the modal
      setShowModal(false);
  
      // Update the offers list with the updated offer
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === selectedOffer._id ? { ...selectedOffer } : offer
        )
      );
    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };
    
  return (
    <div className="container mt-4">
      <div className="row">
        {offers.map((offer, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{offer.title}</h5>
                <p className="card-text">{offer.description}</p>
                <Button className="btn btn-warning text-white" style={{background:'rgb(250,169,53)'}}  onClick={() => handleUpdateClick(offer)}>
                  Update
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing the offer */}
      {showModal && selectedOffer && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
className='input-focus'
                  value={selectedOffer.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={selectedOffer.description}
                  onChange={handleInputChange}
                className='input-focus'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-secondary"   onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button className="btn btn-warning text-white" style={{background:'rgb(250,169,53)'}} variant="primary" onClick={handleUpdateSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OffersList;
