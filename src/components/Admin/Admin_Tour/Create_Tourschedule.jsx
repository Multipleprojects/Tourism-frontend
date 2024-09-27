import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Create_TourSchedule = () => {
  const Tourid = useSelector((state) => state.auth.tourid);
  console.log(Tourid);

  const [schedules, setSchedules] = useState([
    { title: '', description: '', time: '', city: '', lat: '', long: '',images: [[]] }
  ]);

  // Handle form data changes for each schedule input
  const handleInputChange = (index, event) => {
    const newSchedules = [...schedules];
    newSchedules[index][event.target.name] = event.target.value;
    setSchedules(newSchedules);
  };

  // Handle image selection for each schedule and each image input
  const handleImageChange = (scheduleIndex, imageIndex, event) => {
    const newSchedules = [...schedules];
    const selectedImages = Array.from(event.target.files); // Convert FileList to Array
    newSchedules[scheduleIndex].images[imageIndex] = selectedImages; // Add the selected images to the current image array
    setSchedules(newSchedules);
  };

  // Add a new image input for each schedule
  const addImageInput = (scheduleIndex) => {
    const newSchedules = [...schedules];
    newSchedules[scheduleIndex].images.push([]); // Add a new empty array for additional image inputs
    setSchedules(newSchedules);
  };

  // Add a new schedule entry
  const addSchedule = () => {
    setSchedules([...schedules, { title: '', description: '', time: '', city: '', lat: '', long: '',images: [[]] }]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('tourid', Tourid);

    // Append schedule data
    schedules.forEach((schedule, index) => {
      formData.append(`schedules[${index}][title]`, schedule.title);
      formData.append(`schedules[${index}][description]`, schedule.description);
      formData.append(`schedules[${index}][time]`, schedule.time);
      formData.append(`schedules[${index}][city]`, schedule.city);
      formData.append(`schedules[${index}][lat]`, schedule.lat);
      formData.append(`schedules[${index}][long]`, schedule.long);
      formData.append(`schedules[${index}][long]`, schedule.featured);
      // Append images for each schedule
      schedule.images.forEach((imageGroup, i) => {
        imageGroup.forEach((image, imgIndex) => {
          formData.append(`schedules[${index}][images][${i}][${imgIndex}]`, image);
        });
      });
    });

    try {
      await axios.post(`https://www.tripwaly.com/api/tour/schedule/create`, formData, {
     
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Tour schedule created successfully!');
    } catch (error) {
      toast.error('Error creating tour schedule: ' + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <h2 className="mb-4">Create Tour Schedule</h2>

        {schedules.map((schedule, index) => (
          <div key={index} className="schedule-section mb-4">
            <h4>Schedule {index + 1}</h4>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={schedule.title}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={schedule.description}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Time</label>
                <input
                  type="text"
                  name="time"
                  className="form-control"
                  value={schedule.time}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={schedule.city}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Latitude</label>
                <input
                  type="text"
                  name="lat"
                  className="form-control"
                  value={schedule.lat}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Longitude</label>
                <input
                  type="text"
                  name="long"
                  className="form-control"
                  value={schedule.long}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
            </div>
          
            <div className="form-group mb-3">
              <label>Images</label>
              {schedule.images.map((imageGroup, imgGroupIndex) => (
                <div key={imgGroupIndex} className="image-input-group mb-2">
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={(e) => handleImageChange(index, imgGroupIndex, e)}
                  />
                  {imageGroup.length > 0 && (
                    <ul className="list-unstyled mt-2">
                      {imageGroup.map((image, imgIndex) => (
                        <li key={imgIndex}>{image.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-secondary mt-2" onClick={() => addImageInput(index)}>
                Add Another Image
              </button>
            </div>
            <hr />
          </div>
        ))}

        <div className='d-flex gap-1'>
          <button type="button" className="btn btn-secondary mb-3" onClick={addSchedule}>
            Add Another Schedule
          </button>

          <button type="submit" className="btn btn-warning mb-3">
            Create Tour Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create_TourSchedule;
