import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MediaDetails = () => {
    const [mediaData, setMediaData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMedia, setCurrentMedia] = useState(null);
    
    // Fetch media data
    const fetchMediaData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/media/get');
            setMediaData(response.data);
        } catch (error) {
            toast.error('Failed to fetch media data.');
        }
    };

    // Show modal for editing media
    const handleShow = (media) => {
        setCurrentMedia(media);
        setShowModal(true);
    };

    // Close modal
    const handleClose = () => {
        setShowModal(false);
        setCurrentMedia(null);
    };

    // Update media
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const { img1, img2, video1 } = e.target.elements;

        if (img1.files[0]) formData.append('img1', img1.files[0]);
        if (img2.files[0]) formData.append('img2', img2.files[0]);
        if (video1.files[0]) formData.append('video1', video1.files[0]);
        try {
            const response = await axios.put(`http://localhost:8000/api/media/update/${currentMedia._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMediaData((prev) =>
                prev.map((media) => (media._id === currentMedia._id ? response.data.media : media))
            );
            toast.success('Media updated successfully!');
            handleClose();
        } catch (error) {
            toast.error('Failed to update media.');
        }
    };

    // Delete media
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/media/delete/${id}`);
            setMediaData((prev) => prev.filter((media) => media._id !== id));
            toast.success('Media deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete media.');
        }
    };

    useEffect(() => {
        fetchMediaData();
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            <h2 className="mt-4">Media Details</h2>
            {mediaData.length === 0 ? (
                <p>No media available.</p>
            ) : (
                <ul className="list-group mt-3">
                    {mediaData.map((media) => (
                        <li key={media._id} className="list-group-item">
                            <img src={media.img1} alt="Media 1" width="100" />
                            <img src={media.img2} alt="Media 2" width="100" />
                            <video width="100" controls>
                                <source src={media.video1} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <Button variant="primary" onClick={() => handleShow(media)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(media._id)}>Delete</Button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal for Editing Media */}
            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Media</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentMedia && (
                        <Form onSubmit={handleUpdate}>
                            <Form.Group controlId="img1">
                                <Form.Label>Image 1</Form.Label>
                                <Form.Control type="file" accept="image/*" />
                            </Form.Group>
                            <Form.Group controlId="img2">
                                <Form.Label>Image 2</Form.Label>
                                <Form.Control type="file" accept="image/*" />
                            </Form.Group>
                            <Form.Group controlId="video1">
                                <Form.Label>Video</Form.Label>
                                <Form.Control type="file" accept="video/*" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Update Media</Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MediaDetails;
