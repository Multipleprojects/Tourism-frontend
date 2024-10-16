import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const pages = Math.ceil(5 / 4); //later we will use backend data count
    setPageCount(pages);
  }, [page]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
              <Col  className="mb-4" >
                <TourCard  />
              </Col>
            
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span 
                    key={number} 
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Tours;
