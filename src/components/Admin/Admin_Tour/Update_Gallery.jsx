import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Update_Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [galleryId, setGalleryId] = useState("");
  const [showMore, setShowMore] = useState(false);

  // Fetch gallery data by ID
  useEffect(() => {
    axios.get(`http://localhost:8000/api/gallery/get`)
      .then(response => {
        const galleryData = response.data[0]; // Assuming you're fetching an array of galleries
        setGallery(galleryData.images);
        setGalleryId(galleryData._id); // Store the ID of the gallery
      })
      .catch(error => console.error('Error fetching gallery:', error));
  }, []);

  // Delete image by index
  const deleteImage = (index) => {
    axios.put(`http://localhost:8000/api/gallery/update/${galleryId}`, { action: 'delete', index })
      .then(response => setGallery(response.data.gallery.images))
      .catch(error => console.error('Error deleting image:', error));
  };
  const addImage = () => {
    if (newImage) {
      const formData = new FormData();
      formData.append('images', newImage);  // Append the file to the form data
      formData.append('action', 'add');  // Add the action field
  
      axios.put(`http://localhost:8000/api/gallery/update/${galleryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          setGallery(response.data.gallery.images);  // Set the updated gallery images from the response
          setNewImage(null);  // Reset the state
          document.getElementById("imageInput").value = "";  // Clear the input field
        })
        .catch(error => console.error('Error adding image:', error));
    }
  };
  
  // Toggle between showing more or less images
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Display first 4 images, or all images if "showMore" is true
  const displayedImages = showMore ? gallery : gallery.slice(0, 4);

  return (
    <div className="container mt-4">
      <div className="row">
        {displayedImages.map((image, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card">
              <img 
                src={`${image.replace(/\\/g, "/")}`} 
                alt={`Gallery Image ${index}`} 
                className="card-img-top" 
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => deleteImage(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {gallery.length > 4 && (
        <div className="text-center mb-4">
          <p  onClick={toggleShowMore} className='text-primary text-decoration-underline'>
            {showMore ? 'Show Less' : 'Show More Images'}
          </p>
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="imageInput" className="form-label">Add New Image</label>
            <input
  type="file"
  className="form-control"
  id="imageInput"
  onChange={(e) => setNewImage(e.target.files[0])}  // Capture the actual file object
  accept="image/*"
/>

          </div>
        </div>

        <div className="col-md-6 d-flex align-items-end">
          <button className="btn btn-warning text-white" style={{background:"rgb(250,169,53)"}} onClick={addImage}>
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update_Gallery;
