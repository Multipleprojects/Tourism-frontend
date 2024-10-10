import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../../utils/avgRating";
import "../../shared/tour-card.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { backendurl } from '../../config/backend'
const FeaturedTourList = () => {
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchToursAndSchedules();
  }, []);

  const fetchToursAndSchedules = async () => {
    try {
      const tourResponse = await axios.get(`http://localhost:8000/api/tour/schedule/get`);

//const tourResponse = await axios.get(`http://localhost:8000/api/tour/schedule/get`);
// Filter to get only featured tours
//const featuredTours = tourResponse.data.filter(tour => tour.featured === true);     
setTourData(tourResponse.data);  // Set the fetched tours data
    } catch (err) {
      console.error('Error fetching tours and schedules:', err);
      toast.error('Error fetching tours and schedules');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Calculate average rating and total rating
  const { totalRating, avgRating } = calculateAvgRating();

  return (
    <div className="tour__card">
      <ToastContainer />
      <div className="row">
      {tourData.map((tour, index) => (
  tour.tourid.availableseats === 0 ? null : (
    <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <Card className="d-flex">
        {tour.tourid.images && tour.tourid.images.length > 0 && (
          <div>
            <span>
              <img
       src={`${tour.tourid.images[0]}`} // Assuming tour.tourid.images[0] contains the image URL
         
                alt={`Image ${index + 1}`}
                style={{ width: '19rem', height: '14rem' }}
              />
            </span>
          </div>
        )}
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {tour.tourid.location}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {tour.tourid.avgRating === 0 ? null : tour.tourid.avgRating}
              {tour.tourid.totalRating === 0 ? "Not rated" : <span>reviews</span>}
            </span>
          </div>

          <h5 className="tour__title">
            {tour.tourid.title.length > 31 ? (
              `${tour.tourid.title.slice(0, 28)}...`
            ) : (
              <Link to={`/tours/${tour._id}`}>{tour.tourid.title}</Link>
            )}
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              PKR {tour.tourid.price}
              <span>/person</span>
            </h5>

            <button className="btn btn-sm booking__btn">
              <Link to={`/tours/${tour._id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
))}
      </div>
    </div>
  );
};

export default FeaturedTourList;
