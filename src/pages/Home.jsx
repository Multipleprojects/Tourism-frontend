import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { Container, Row, Col, Media } from "reactstrap";
import Subtitle from "../shared/Subtitle";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";
import axios from "axios";
const Home = () => {
  const [stats, setStats] = useState(null);
  const [description, setDescription] = useState('z');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mediaData, setMediaData] = useState([]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('https://www.tripwaly.com/api/statistic/get');
      if (response.data.length > 0) {
        setStats(response.data[0]); // Assuming you only have one set of statistics
      }
    } catch (error) {
      setError('Error fetching statistics data.');
    }
  };

  const fetchTourOperator = async () => {
    try {
      const response = await axios.get('https://www.tripwaly.com/api/touroperator/get');
      if (response.data && response.data.length > 0) {
        setDescription(response.data[0].description || 'No description available.');
      } else {
        setDescription('No description available.');
      }
    } catch (err) {
      setError('Error fetching tour operator data.');
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/media/get'); // Adjust the URL as needed
      setMediaData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetchStatistics();
      fetchTourOperator();
      fetchMedia();
      setLoading(false);
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Your journey, your story!"} />
                  <img src={worldImg} alt="" />
                </div>

                <h1>
                  Make every trip a <span className="highlight">story</span>{" "}
                  worth sharing
                </h1>
                <p>{description}</p>
              </div>
            </Col>
            {mediaData.map((media) => (
              
  <React.Fragment key={media._id}>
    <Col lg="2">
      <div className="hero__img-box">
        <img src={`http://localhost:8000/${media.img1}`} alt="" />
      </div>
    </Col>

    <Col lg="2">
      <div className="hero__img-box mt-4">
        <video src={`http://localhost:8000/${media.video1}`} controls />
      </div>
    </Col>

    <Col lg="2">
      <div className="hero__img-box mt-5">
        <img src={`http://localhost:8000/${media.img2}`} alt="" 
        />
      </div>
    </Col>
  </React.Fragment>
))}
        
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <Subtitle subtitle={"What we serve"} />
              <h2 className="services__title">We offer the best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With years of expertise <br /> we will serve you
                </h2>
                <p>{stats?.message}</p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>{stats?.successfulTrips}+</span>
                  <h6>Successful trips</h6>
                </div>
                <div className="counter__box">
                  <span>{stats?.regularClients}+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>{stats?.yearsExperience}</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Col lg="12">
            <Subtitle subtitle={"Gallery"} />
            <h2 className="gallery_title">Visit our tour gallery</h2>
          </Col>

          <Col lg="12">
            <MasonryImagesGallery />
          </Col>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>

            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Home;
