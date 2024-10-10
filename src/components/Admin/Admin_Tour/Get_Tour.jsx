import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Get_Tour = () => {
    const [tourSchedules, setTourSchedules] = useState([]);
    const [tourFaqs, setTourFaqs] = useState([]);

    useEffect(() => {
        // Fetch Tour Schedules
        const fetchTourSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tour/schedule/get');
                setTourSchedules(response.data); // Set the fetched tour schedules data
            } catch (error) {
                console.error('Error fetching tour schedules', error);
            }
        };

        // Fetch Tour FAQs
        const fetchTourFaqs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tour/faqs/get');
                setTourFaqs(response.data); // Set the fetched FAQs data
            } catch (error) {
                console.error('Error fetching tour FAQs', error);
            }
        };

        fetchTourSchedules();
        fetchTourFaqs();
    }, []);

    return (
        <div>
            {/* Check if tourSchedules exist and map through the data */}
            {tourSchedules && tourSchedules.map(scheduleGroup => (
                <div key={scheduleGroup._id} className="tour-schedule">
                    {/* Display tour information */}
                    <h1>Tour images</h1>
                    <div className="tour-images">
                        {scheduleGroup.tourid.images && scheduleGroup.tourid.images.length > 0 ? (
                            scheduleGroup.tourid.images.map((image, index) => (
                                <img key={index} src={image} alt={`Tour ${scheduleGroup.tourid.title} Image ${index}`} style={{ width: '200px', height: 'auto', marginRight: '10px' }} />
                            ))
                        ) : (
                            <p>No images available for this tour.</p>
                        )}
                    </div>

                    <h3>{scheduleGroup.tourid.title}</h3>
                    <p>{scheduleGroup.tourid.description}</p>
                    <p>From: {scheduleGroup.tourid.fromcity} To: {scheduleGroup.tourid.tocity}</p>
                    <p>Distance: {scheduleGroup.tourid.distance}</p>
                    <p>Price: {scheduleGroup.tourid.price}</p>
                    <button>Update tour</button>
                    {/* Display each schedule under the tour */}
                    <h4>Schedules:</h4>
                    {scheduleGroup.schedules.map(schedule => (
                        <div key={schedule._id} className="schedule-item">
                            <p>Title: {schedule.title}</p>
                            <p>Description: {schedule.description}</p>
                            <p>Time: {schedule.time}</p>
                            <p>City: {schedule.city}</p>
                            {/* Display schedule image if available */}
                            {schedule.images && <img src={schedule.images} alt="Schedule" style={{ width: '100px', height: 'auto' }} />}
                            <button>Update tour schedule</button>
                        </div>
                    
                    ))}

                    {/* Compare and Display FAQs if the tour._id matches */}
                    <h4>Tour FAQs:</h4>
                    {tourFaqs && tourFaqs.map(faq => (
                        faq.tour._id === scheduleGroup.tourid._id && (
                            <div key={faq._id} className="tour-faq">
                                {faq.TourFAQS.map(faqItem => (
                                    <div key={faqItem._id}>
                                        <p><strong>Q:</strong> {faqItem.question}</p>
                                        <p><strong>A:</strong> {faqItem.answer}</p>
                                        <button className='mb-3'>Update faqs</button>
                    
                                    </div>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Get_Tour;
