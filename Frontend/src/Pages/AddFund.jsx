import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const AddFundsPage = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd normally send this to your backend
    console.log('Amount:', amount, 'Method:', method);
    setSuccess(true);
    setAmount('');
    setMethod('');
  };

  return (
    <div className="min-vh-100 py-4" style={{ backgroundColor: '#e3f2fd' }}>
      <Container>
        <Card className="p-4 shadow-sm">
          <h3 className="mb-4">Add Funds to Wallet</h3>

          {success && <Alert variant="success">Funds added successfully (simulated)!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Enter Amount (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select value={method} onChange={(e) => setMethod(e.target.value)} required>
                    <option value="">Select method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary">
              Add Funds
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default AddFundsPage;
