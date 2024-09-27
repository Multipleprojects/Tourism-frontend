import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { useDispatch } from "react-redux";
import { setTourseats, setTourlocation } from "../components/Redux Toolkit/authSlice";

const SearchBar = ({ fetchToursAndSchedules }) => {
  const dispatch = useDispatch();
  const locationRef = useRef("");
  const maxGroupRef = useRef(0);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    dispatch(setTourlocation(location));
    fetchToursAndSchedules(); // Trigger the fetch after setting search criteria
  };

  const handleMaxGroupChange = (e) => {
    const maxGroup = e.target.value;
    dispatch(setTourseats(maxGroup));
    fetchToursAndSchedules(); // Trigger the fetch after setting search criteria
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Islamabad to Swat"
                onChange={handleLocationChange} // Trigger onChange
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input 
                type="text" 
                placeholder="0" 
                onChange={handleMaxGroupChange} // Trigger onChange
              />
            </div>
          </FormGroup>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
