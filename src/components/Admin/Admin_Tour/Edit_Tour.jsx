import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { backendurl } from '../../../config/backend';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit_Tour = ({ show, handleClose, tourData, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fromcity: '',
    tocity: '',
    distance: '',
    price: '',
    duration: '',
    tags: [],
    category: [{ title: '', description: '' }],
    images: [],
    location:'',
    distance:'',
    price:'',
    postcode:'',
    duration:'',
    latitude:'',
    longitude:''
  });

  // Update formData based on the tourData passed
  useEffect(() => {
    if (tourData) {
      setFormData({
        title: tourData.title || '',
        description: tourData.description || '',
        fromcity: tourData.fromcity || '',
        tocity: tourData.tocity || '',
        distance: tourData.distance || '',
        price: tourData.price || '',
        duration: tourData.duration || '',
        tags: tourData.tags || [],
        category: tourData.category || [{ title: '', description: '' }],
        images: tourData.images || [],
        location:tourData.location || [],
        distance:tourData.distance || [],
        price:tourData.price || [],
        postcode:tourData.postcode || [],
        duration:tourData.duration || [],
      
        latitude:tourData.latitude || [],
        longitude:tourData.longitude || [],
      });
    }
  }, [tourData]);

  // Handle input changes for basic fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for array fields (tags, category)
  const handleArrayChange = (index, e, arrayField, fieldKey = null) => {
    const newArray = [...formData[arrayField]];
    if (fieldKey) {
      newArray[index][fieldKey] = e.target.value; // For nested objects like category
    } else {
      newArray[index] = e.target.value; // For simple arrays like tags
    }
    setFormData({ ...formData, [arrayField]: newArray });
  };

  // Add new entry to arrays
  const addArrayField = (arrayField) => {
    const newArrayEntry =
      arrayField === 'category' ? { title: '', description: '' } : '';
    setFormData({ ...formData, [arrayField]: [...formData[arrayField], newArrayEntry] });
  };

  // Handle image file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...files] });
  };

  // Handle form submit to update the tour
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedData = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            if (typeof item === 'object') {
              // For category, append nested objects properly
              Object.keys(item).forEach((subKey) => {
                updatedData.append(`${key}[${index}][${subKey}]`, item[subKey]);
              });
            } else {
              updatedData.append(`${key}[${index}]`, item);
            }
          });
        } else {
          updatedData.append(key, formData[key]);
        }
      });

      // Append images
      formData.images.forEach((image, index) => {
        if (image instanceof File) {
          updatedData.append(`images`, image); // Upload as file
        }
      });

      // Send the PUT request to update the tour
      await axios.put(`https://www.tripwaly.com/api/tour/update/${tourData._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Tour updated successfully');
      handleClose();
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error('Error updating tour:', err);
      toast.error(`Error updating tour: ${err.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Title Input */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Description Input */}
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            {/* From City Input */}
            <Form.Group controlId="formFromCity">
              <Form.Label>From City</Form.Label>
              <Form.Control
                type="text"
                name="fromcity"
                value={formData.fromcity}
                onChange={handleChange}
              />
            </Form.Group>

            {/* To City Input */}
            <Form.Group controlId="formToCity">
              <Form.Label>To City</Form.Label>
              <Form.Control
                type="text"
                name="tocity"
                value={formData.tocity}
                onChange={handleChange}
              />
            </Form.Group>
   {/* Location location */}
   <Form.Group controlId="formTitle">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
   {/* distance Input */}
   <Form.Group controlId="formTitle">
              <Form.Label>Distance</Form.Label>
              <Form.Control
                type="text"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
              />
            </Form.Group>
   {/* Price Input */}
   <Form.Group controlId="formTitle">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
   {/* Postcode Input */}
   <Form.Group controlId="formTitle">
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
              />
            </Form.Group>
   {/* duration Input */}
   <Form.Group controlId="formTitle">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.duration}
                onChange={handleChange}
              />
            </Form.Group>
   {/* Latitude Input */}
   <Form.Group controlId="formTitle">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </Form.Group>
   {/* Longitude Input */}
   <Form.Group controlId="formTitle">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Tags Input */}
            <Form.Group controlId="formTags">
              <Form.Label>Tags</Form.Label>
              {formData.tags.map((tag, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={tag}
                  onChange={(e) => handleArrayChange(index, e, 'tags')}
                  placeholder={`Tag ${index + 1}`}
                />
              ))}
              <Button variant="secondary" onClick={() => addArrayField('tags')}>
                Add Tag
              </Button>
            </Form.Group>

            {/* Category Input */}
            {formData.category.map((cat, index) => (
              <div key={index}>
                <Form.Group controlId={`formCategoryTitle${index}`}>
                  <Form.Label>Category Title {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    value={cat.title}
                    onChange={(e) => handleArrayChange(index, e, 'category', 'title')}
                    placeholder={`Category Title ${index + 1}`}
                  />
                </Form.Group>
                <Form.Group controlId={`formCategoryDescription${index}`}>
                  <Form.Label>Category Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={cat.description}
                    onChange={(e) => handleArrayChange(index, e, 'category', 'description')}
                    placeholder={`Category Description ${index + 1}`}
                  />
                </Form.Group>
              </div>
            ))}
            <Button variant="secondary" onClick={() => addArrayField('category')}>
              Add Category
            </Button>

            {/* Image File Upload */}
            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                accept="image/*"
              />
              <ul>
                {formData.images.map((image, index) =>
                  typeof image === 'string' ? (
                    <li key={index}>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100px', height: 'auto' }}
                      />
                    </li>
                  ) : (
                    <li key={index}>{image.name}</li>
                  )
                )}
              </ul>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleSubmit}>
            Update Tour
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit_Tour;
