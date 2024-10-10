// src/components/Create_Tour.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setTourid } from '../../Redux Toolkit/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useSelector } from 'react-redux';
const Create_Tour = () => {
  const role=useSelector((state)=>state.auth.login.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [cities, setCities] = useState([]);
  const [images, setImages] = useState([]); 

  // Individual state variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fromcity, setFromCity] = useState('');
  const [tocity, setToCity] = useState('');
  const [distance, setDistance] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [postcode, setPostcode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [fromlatitude, setfromLatitude] = useState('');
  const [fromlongitude, setfromLongitude] = useState('');
  const [duration, setDuration] = useState('');
  const [fromdate, setFromDate] = useState('');
  const [todate, setToDate] = useState('');
  const [availableseats, setAvailableSeats] = useState('');
  const [category, setCategory] = useState([{ title: '', description: '' }]);
  const [tags, setTags] = useState(['']);
  const [admin,setAdmin] = useState();
  const [company, setCompany] = useState('');
  useEffect(() => {
    if (role === "admin") {
      setAdmin(role);
    } else if (role === "company") {
      setCompany(role);
    }
  }, [role]);
  useEffect(() => {
  
     axios.get(`http://localhost:8000/api/tour/city/get`)
      .then(response => {
        const cityData = response.data[0].city;
        const cityOptions = cityData.map(city => ({ value: city, label: city }));
        setCities(cityOptions);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages([...images, file]);
    }
  };
  const handleDelete = (index) => {
    const updatedImages = [...images]; // Create a copy of the images array
    updatedImages.splice(index, 1); // Remove the image at the specific index
    setImages(updatedImages); // Update the state with the new array
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append individual fields to formData
    formDataToSend.append('title', title);
    formDataToSend.append('description', description);
    formDataToSend.append('fromcity', fromcity);
    formDataToSend.append('tocity', tocity);
    formDataToSend.append('distance', distance);
    formDataToSend.append('location', location);
    formDataToSend.append('price', price);
    formDataToSend.append('postcode', postcode);
    formDataToSend.append('latitude', latitude);
    formDataToSend.append('longitude', longitude);
    
    formDataToSend.append('fromlatitude', fromlatitude);
    formDataToSend.append('fromlongitude', fromlongitude);
    formDataToSend.append('duration', duration);
    formDataToSend.append('fromdate', fromdate);
    formDataToSend.append('todate', todate);
    formDataToSend.append('availableseats', availableseats);
    formDataToSend.append('admin', admin);
    formDataToSend.append('company', company);

    // Append category array to formData
    category.forEach((cat, index) => {
      formDataToSend.append(`category[${index}][title]`, cat.title);
      formDataToSend.append(`category[${index}][description]`, cat.description);
    });

    // Append tags array to formData
    tags.forEach((tag, index) => {
      formDataToSend.append(`tags[${index}]`, tag);
    });

    // Append images to formData
    images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/tour/create`, formDataToSend, {
      
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const createdTour = response.data;
      dispatch(setTourid(createdTour._id));
      toast.success('Tour created successfully!');
      navigate('/admin/dashboard/create/tour/schedule');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        if (errorMessage === 'A tour with this title already exists') {
          toast.error('A tour with this title already exists');
        } else {
          toast.error(`Error creating tour: ${errorMessage}`);
        }
      } else {
        toast.error(`Error creating tour: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h1 className="text-center mb-4">Create Tour</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Tour Fields */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            required
            />
          </div>
        </div>
        <div className='row'>
          <div className="col-md-6 mb-3">
            <Select
              options={cities}
              value={fromcity ? { value: fromcity, label: fromcity } : null}
              onChange={(option) => setFromCity(option ? option.value : '')}
             required
              placeholder="Select a from city"
            />
          </div>
          <div className="col-md-6 mb-3">
            <Select
              options={cities}
              value={tocity ? { value: tocity, label: tocity } : null}
              onChange={(option) => setToCity(option ? option.value : '')}
             required
              placeholder="Select a to city"
            />
          </div>
        </div>
        {/* Distance Location */}
        <div className='row'>
        <div className="col-md-6 mb-3">
        <label>Distance</label>
            <input
              type="text"
              className="form-control"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>
        
        {/* Price, postcode */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Postcode</label>
            <input
              type="number"
              className="form-control"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
          </div>
        </div>
        {/*latitude , longitude */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Latitude</label>
            <input
              type="number"
              className="form-control"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Longitude</label>
            <input
              type="number"
              className="form-control"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
        </div>
        {/*latitude , longitude */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>From City Latitude</label>
            <input
              type="number"
              className="form-control"
              value={fromlatitude}
              onChange={(e) => setfromLatitude(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>From City Longitude</label>
            <input
              type="number"
              className="form-control"
              value={fromlongitude}
              onChange={(e) => setfromLongitude(e.target.value)}
              required
            />
          </div>
        </div>
       
        {/* Duration */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Duration</label>
            <input
              type="text"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
       
          <div className="col-md-6 mb-3">
            <label>Available Seats</label>
            <input
              type="number"
              className="form-control"
              value={availableseats}
              onChange={(e) => setAvailableSeats(e.target.value)}
              required
            />
          </div>
       </div>
       {/* From and to date */}
       <div className="row">
          <div className="col-md-6 mb-3">
            <label>To Date</label>
            <input
              type="date"
              className="form-control"
              value={todate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>From Date</label>
            <input
              type="date"
              className="form-control"
              value={fromdate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
       
        </div>
        {/* Categories */}
        <div className="mb-3">
          <label>Categories</label>
          {category.map((cat, index) => (
            <div className="row mb-3" key={index}>
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Title"
                  value={cat.title}
                  required
                  onChange={(e) => {
                 
                    const newCategory = [...category];
                    newCategory[index].title = e.target.value;
                    setCategory(newCategory);
                  }}
                />
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Description"
                  value={cat.description}
                  required
                  onChange={(e) => {
                 
                    const newCategory = [...category];
                    newCategory[index].description = e.target.value;
                    setCategory(newCategory);
                  }}
                />
              </div>
              <div className="col-md-12 mt-2">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    const newCategory = category.filter((_, i) => i !== index);
                    setCategory(newCategory);
                  }}
                >
                  Remove Category
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setCategory([...category, { title: '', description: '' }])}
          >
            Add Category
          </button>
        </div>
        {/* Tags */}
        <div className="mb-3">
          <label>Tags</label>
          {tags.map((tag, index) => (
            <div className="row mb-3" key={index}>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tag"
                  value={tag}
        required
                  onChange={(e) => {
                    const newTags = [...tags];
                    newTags[index] = e.target.value;
                    setTags(newTags);
                  }}
                />
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    const newTags = tags.filter((_, i) => i !== index);
                    setTags(newTags);
                  }}
                >
                  Remove Tag
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setTags([...tags, ''])}
          >
            Add Tag
          </button>
        </div>
        {/* Images */}
<label>Images:</label>
{images.length > 0 &&
  images.map((image, index) => (
    <div key={index}>
      <p>Image {index + 1}:{image.name}</p>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </div>
  ))}


<div>
<input type="file" onChange={handleImageChange} />
</div>

        
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Create Tour</button>
      </form>
    </div>
  );
};
export default Create_Tour;
