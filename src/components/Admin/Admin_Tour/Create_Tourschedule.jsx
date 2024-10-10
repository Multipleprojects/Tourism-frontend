import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Create_TourSchedule = () => {
  const navigate=useNavigate();
  const tourId=useSelector((state)=>state.auth.tourid);
  const [tourid, setTourid] = useState(tourId);
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(false);
  const [schedules, setSchedules] = useState([
    { title: '', description: '', time: '', city: '', lat: '', long: '' },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleScheduleChange = (index, event) => {
    const { name, value, files } = event.target;
    const newSchedules = [...schedules];

    if (name === "lat" || name === "long") {
      newSchedules[index][name] = parseFloat(value);
    } else {
      newSchedules[index][name] = value;
    }

    setSchedules(newSchedules);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { title: '', description: '', time: '', city: '', lat: '', long: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('tourid', tourid);
    formData.append('featured', featured);
    formData.append('active', active);
    if (selectedFile) {
      formData.append('images', selectedFile);
    }
    schedules.forEach((schedule, index) => {
      formData.append(`schedules[${index}][title]`, schedule.title);
      formData.append(`schedules[${index}][description]`, schedule.description);
      formData.append(`schedules[${index}][time]`, schedule.time);
      formData.append(`schedules[${index}][city]`, schedule.city);
      formData.append(`schedules[${index}][lat]`, schedule.lat);
      formData.append(`schedules[${index}][long]`, schedule.long);
      if (schedule.images) {
        formData.append(`schedules[${index}][images]`, schedule.images); // Append file
      }
    });

    try {
      const response = await axios.post('http://localhost:8000/api/tour/schedule/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/admin/dashboard/create/tour/faqs");
    } catch (error) {
      alert('Error creating tour schedule:', error.response.data);
    }
  };
  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <label className="form-check-label">Featured</label>
      </div>


      {schedules.map((schedule, index) => (
        <div key={index} className="mb-4">
          <h3>Schedule {index + 1}</h3>

          <div className="form-row">
            <div className="col">
              <input
                name="title"
                value={schedule.title}
                placeholder="Title"
                className="form-control"
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
            <div className="col">
              <input
                name="description"
                value={schedule.description}
                placeholder="Description"
                className="form-control"
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
          </div>

          <div className="form-row mt-3">
            <div className="col">
              <input
                name="time"
                value={schedule.time}
                placeholder="Time"
                className="form-control"
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
            <div className="col">
              <input
                name="city"
                value={schedule.city}
                placeholder="City"
                className="form-control"
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
          </div>

          <div className="form-row mt-3">
            <div className="col">
              <input
                name="lat"
                value={schedule.lat}
                placeholder="Latitude"
                className="form-control"
                onChange={(e) => handleScheduleChange(index, e)}
                type="number"
                required
              />
            </div>
            <div className="col">
              <input
                name="long"
                value={schedule.long}
                placeholder="Longitude"
                className="form-control"
                type="number"
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Image:</label>
            <div className="mt-3">
            <input type="file" onChange={fileChangeHandler} />
          </div>

          </div>
        </div>
      ))}

      <button type="button" className="btn btn-secondary" onClick={handleAddSchedule}>Add Schedule</button>
      <button type="submit" className="btn btn-primary mt-3">Create Tour Schedule</button>
    </form>
  );
};

export default Create_TourSchedule;
