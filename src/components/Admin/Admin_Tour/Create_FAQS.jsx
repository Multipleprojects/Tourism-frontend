import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Create_FAQs = () => {
  const tourId = useSelector((state) => state.auth.tourid);
  const [tour, setTour] = useState(tourId);
 
  const [tourFAQS, setTourFAQS] = useState([{ question: '', answer: '' }]);

  // Handle input change for each FAQ question and answer
  const handleFAQChange = (index, field, value) => {
    const updatedFAQs = [...tourFAQS];
    updatedFAQs[index][field] = value;
    setTourFAQS(updatedFAQs);
  };

  // Add new FAQ field
  const addFAQ = () => {
    setTourFAQS([...tourFAQS, { question: '', answer: '' }]);
  };

  // Remove FAQ field
  const removeFAQ = (index) => {
    const updatedFAQs = [...tourFAQS];
    updatedFAQs.splice(index, 1);
    setTourFAQS(updatedFAQs);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/tour/faqs/create', {
            tour,
            TourFAQS: tourFAQS,
        });
        toast.success('FAQs created successfully!'); // Show success message
        console.log(response.data);
    } catch (error) {
        console.error('Error creating FAQs:', error);
        toast.error('Error creating FAQs'); // Show error message
    }
};

  return (
    <div className="container mt-4">
      <h2>Create FAQs</h2>
      <form onSubmit={handleSubmit}>
        {/* FAQ Questions and Answers */}
        {tourFAQS.map((faq, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`question-${index}`} className="form-label">
              Question {index + 1}:
            </label>
            <input
              type="text"
              id={`question-${index}`}
              className="form-control"
              value={faq.question}
              onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
              required
            />

            <label htmlFor={`answer-${index}`} className="form-label mt-2">
              Answer {index + 1}:
            </label>
            <input
              type="text"
              id={`answer-${index}`}
              className="form-control"
              value={faq.answer}
              onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
              required
            />

            {/* Remove FAQ Button */}
            {index > 0 && (
              <button type="button" className="btn btn-danger mt-2" onClick={() => removeFAQ(index)}>
                Remove FAQ
              </button>
            )}
          </div>
        ))}

        {/* Add new FAQ button */}
        <button type="button" className="btn btn-primary mb-3" onClick={addFAQ}>
          Add FAQ
        </button>

        {/* Submit button */}
        <button type="submit" className="btn btn-success">
          Create FAQs
        </button>
      </form>

      {/* Toast Container for messages */}
      <ToastContainer />
    </div>
  );
};

export default Create_FAQs;
