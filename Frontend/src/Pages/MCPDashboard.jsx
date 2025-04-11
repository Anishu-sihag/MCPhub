import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MCPDashboard = () => {
  const navigate = useNavigate();
  const walletBalance = 12500;

  return (
    <div className="min-vh-50 py-5" style={{ backgroundColor: '#1c1c1c' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card className="shadow-lg text-light" style={{ backgroundColor: '#343a40' }}>
              <Card.Body>
                <Card.Title className="text-center mb-4">MCP Dashboard</Card.Title>
                <Card.Text className="text-center mb-3">
                  <strong>Wallet Balance:</strong> ₹{walletBalance}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button variant="success" onClick={() => navigate('/add-funds')}>
                    Add Funds
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MCPDashboard;
