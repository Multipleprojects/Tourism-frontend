import React, { useState } from 'react';
import axios from 'axios';

const Create_Touroffer = () => {
  const [offers, setOffers] = useState([{ title: '', description: '' }]);

  const handleChange = (index, e) => {
    const updatedOffers = [...offers];
    updatedOffers[index][e.target.name] = e.target.value;
    setOffers(updatedOffers);
  };

  const addOffer = () => {
    setOffers([...offers, { title: '', description: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.tripwaly.com/api/offer/create', offers);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to submit offers:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {offers.map((offer, index) => (
        <div key={index}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={offer.title}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={offer.description}
            onChange={(e) => handleChange(index, e)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addOffer}>Add Other Offer</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Create_Touroffer;
