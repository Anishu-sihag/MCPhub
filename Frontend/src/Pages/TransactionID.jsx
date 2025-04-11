import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  Table,
  Form,
  Button,
  Row,
  Col,
  Alert
} from 'react-bootstrap';

const TransactionHistory = () => {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get('/api/partners');
        setPartners(res.data);
      } catch (err) {
        console.log('Error fetching partners:', err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await axios.get('/api/payments');
        setTransactions(res.data);
      } catch (err) {
        console.log('Error fetching transactions:', err);
      }
    };

    fetchPartners();
    fetchTransactions();
  }, []);

  const handleAddTransaction = async () => {
    if (!selectedPartner || !amount || !paymentMethod) {
      setErrorMsg('All fields are required!');
      return;
    }

    try {
      const newTransaction = {
        partner: selectedPartner,
        amount: Number(amount),
        method: paymentMethod,
        date: new Date().toISOString().slice(0, 10),
        type: 'Credit',
      };

      const res = await axios.post('/api/payments', newTransaction);
      setTransactions([...transactions, res.data]);
      setSuccessMsg('Transaction added successfully!');
      setErrorMsg('');
      setAmount('');
      setPaymentMethod('');
      setSelectedPartner('');

      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.log('Error adding transaction:', err);
      setErrorMsg('Failed to add transaction.');
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#1c1c1c' }}>
      <Container>
        <div className="d-flex flex-column align-items-center">
          <Card className="shadow-sm mb-4 w-100" style={{ maxWidth: '800px', backgroundColor: '#2e2e2e', color: 'white' }}>
            <Card.Body>
              <Card.Title className="mb-4">Add Payment</Card.Title>

              {successMsg && <Alert variant="success">{successMsg}</Alert>}
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

              <Row className="mb-3">
                <Col md={4} className="mb-2">
                  <Form.Select
                    value={selectedPartner}
                    onChange={(e) => setSelectedPartner(e.target.value)}
                  >
                    <option value="">Select Partner</option>
                    {partners.map((p) => (
                      <option key={p._id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3} className="mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Col>
                <Col md={3} className="mb-2">
                  <Form.Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Payment Method</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button variant="success" className="w-100" onClick={handleAddTransaction}>
                    Add
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm w-100" style={{ maxWidth: '800px', backgroundColor: '#2e2e2e', color: 'white' }}>
            <Card.Body>
              <Card.Title>Transaction History</Card.Title>
              <Table bordered hover responsive className="mt-3 text-white">
                <thead style={{ backgroundColor: '#3a3a3a' }}>
                  <tr>
                    <th>Partner</th>
                    <th>Type</th>
                    <th>Amount (₹)</th>
                    <th>Method</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((txn, idx) => (
                      <tr key={idx}>
                        <td>{txn.partner}</td>
                        <td>{txn.type}</td>
                        <td>{txn.amount}</td>
                        <td>{txn.method}</td>
                        <td>{txn.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-light">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default TransactionHistory;
