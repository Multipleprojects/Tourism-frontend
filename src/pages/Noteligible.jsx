// src/components/NotEligible.js
import React from 'react';
import { Container, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const Noteligible = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center" style={{ maxWidth: '600px', width: '100%' }}>
        <CardBody>
          <CardTitle style={{color:'rgb(250,169,53)'}} tag="h2">You Are Not Eligible to Access This Feature</CardTitle>
          <CardText>
            We regret to inform you that your account does not have the necessary permissions
            to access this section of our website. Please contact your admin for assistance.
          </CardText>
          <CardText>
            We appreciate your understanding and cooperation. Thank you for being a valued member.
          </CardText>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Noteligible;
