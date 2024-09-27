import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tour_Gallery = () => {
  const [images, setImages] = useState([]); // Array to hold images

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImages([...images, file]); // Add image to the array
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send files and title
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image); // Append each image to FormData
    });

    try {
      // Send the POST request to the backend
      const response = await axios.post('http://localhost:8000/api/gallery/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Gallery uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading gallery:', error);
    }
  };

  return (
    <div>
      <h2>Upload Gallery</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Images:</label>
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index}>
                <p>Image {index + 1}: {image.name}</p>
              </div>
            ))}
        </div>
        <div>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="button" onClick={handleImageChange}>
          Add Image
        </button>
        <div>
          <button type="submit">Submit Gallery</button>
        </div>
      </form>

    </div>
  );
};

export default Tour_Gallery;



