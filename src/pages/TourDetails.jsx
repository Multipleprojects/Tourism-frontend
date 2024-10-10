import React, { useState, useRef, useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTourid } from "../components/Redux Toolkit/authSlice";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import Review from "../shared/Review";
// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const TourDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); // Move the dispatch to the top level
  const [tourData, setTourData] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchToursAndSchedules();
  }, [id]);

  const fetchToursAndSchedules = async () => {
    try {
       const response = await axios.get(`http://localhost:8000/api/tour/schedule/getbyid/${id}`);
    
      setTourData(response.data);
    } catch (err) {
      console.error('Error fetching tours and schedules:', err);
      toast.error('Error fetching tours and schedules');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Dispatch tour ID once the tourData is set
  useEffect(() => {
    if (tourData?._id) {
      dispatch(setTourid(tourData._id));
    }
  }, [tourData, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { tourid, schedules } = tourData || {};
  console.log("tour ids",tourData._id,tourid._id)

  return (
    <>
      <ToastContainer />
      <section>
        <Container>
          <Row>
            <Col>
              <div className="tour__content">
                {tourid?.images?.length > 0 && (
                  <img src={`${tourid.images[0]}`} alt={tourid.images[0]} />
                )}

                <div className="tour__info">
                  <h2>{tourid?.title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="ri-star-s-fill" style={{ color: "var(--secondary-color)" }}></i>
                      {tourRating}
                    </span>
                    <span>
                      <i className="ri-map-pin-fill"></i>
                      {tourid?.fromcity} to {tourid?.tocity}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {tourid?.distance}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> Rs {tourid?.price} / person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i> {tourid?.duration}
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {tourid?.availableseats} people
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p>{tourid?.description}</p>

                  <h5>Available Schedules</h5>
                  <ListGroup>
                    {schedules?.map((schedule) => (
                      <ListGroupItem key={schedule._id}>
                        <h6>{schedule.title}</h6>
                        <p>{schedule.description}</p>
                        <p><i className="ri-map-pin-line"></i> {schedule.city}</p>
                        <p><i className="ri-time-line"></i> {schedule.time}</p>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>

                <Review tourscheduleid={tourData._id} />
              
              </div>
            </Col>

            <Col lg="4">
              <Booking tourscheduleid={tourData._id} tourid={tourid._id} tour={tourid} />
            </Col>
          </Row>
        </Container>
      </section>
     <Newsletter />
    </>
  );
};

// Wrap TourDetails component with ErrorBoundary
const TourDetailsWithErrorBoundary = () => (
  <ErrorBoundary>
    <TourDetails />
  </ErrorBoundary>
);

export default TourDetailsWithErrorBoundary;
