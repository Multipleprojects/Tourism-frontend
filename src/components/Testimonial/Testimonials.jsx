import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://www.tripwaly.com/api/user/review/get');
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {testimonials.map((testimonial) => (
        <div className="testimonial py-4 px-3" key={testimonial._id}>
          <p>
            {testimonial.review}
          </p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <img
              src={`https://www.tripwaly.com/${testimonial.images}`} // Adjust URL based on your backend setup
              className="w-25 h-25 rounded-2"
              alt={testimonial.user?.name || 'User'} // Fallback to 'User' if name is not available

/>
            <div>
              <h6 className="mb-0 mt-3">{testimonial.user?.name || 'User'}</h6> {/* Fallback to 'Anonymous' */}
              <p>Customer</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
