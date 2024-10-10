import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import axios from "axios";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/offer/get");
        if (response.data.length > 0) {
          setServices(response.data[0].offers); // Assuming offers are nested
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const servicesData = [
    {
      imgUrl: weatherImg,
    },
    {
      imgUrl: guideImg,
    },
    {
      imgUrl: customizationImg,
    },
  ];

  return (
    <>
      {services && services.map((item, index) => {
        // Assign an image from servicesData based on the index
        const img = servicesData[index % servicesData.length].imgUrl;

        return (
          <Col lg="3" key={item._id}> {/* Use unique ID as key */}
            <ServiceCard item={{ imgUrl: img, title: item.title, desc: item.description }} />
          </Col>
        );
      })}
    </>
  );
};

export default ServiceList;
