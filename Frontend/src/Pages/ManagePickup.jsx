import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, Table, Row, Col, Alert } from 'react-bootstrap';

const ManagePickupPartners = () => {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({ name: '', email: '' });
  const [addedPartner, setAddedPartner] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchPartners = async () => {
    try {
      const res = await axios.get('/api/partners');
      setPartners(res.data);
    } catch (err) {
      console.log('Error fetching partners:', err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const addPartner = async () => {
    try {
      const res = await axios.post('/api/partners', {
        ...newPartner,
        status: 'Active',
        ordersCompleted: 0
      });
      setSuccessMsg('Partner added successfully!');
      setErrorMsg('');
      setAddedPartner(res.data);
      setNewPartner({ name: '', email: '' });

      setTimeout(() => {
        setSuccessMsg('');
        setAddedPartner(null);
      }, 3000);

      fetchPartners();
    } catch (err) {
      console.log('Error adding partner:', err);
      setErrorMsg('Failed to add partner. Please try again.');
      setSuccessMsg('');
    }
  };

  const removePartner = async (id) => {
    try {
      await axios.delete(`/api/partners/${id}`);
      fetchPartners();
    } catch (err) {
      console.error('Error removing partner:', err);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#2e2e2e' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="p-4 shadow-lg text-light" style={{ backgroundColor: '#343a40' }}>
              <h3 className="mb-4 text-center">Manage Pickup Partners</h3>

              <Form className="mb-4">
                <Row>
                  <Col md={5} sm={12} className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={newPartner.name}
                      onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    />
                  </Col>
                  <Col md={5} sm={12} className="mb-2">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={newPartner.email}
                      onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                    />
                  </Col>
                  <Col md={2} sm={12}>
                    <Button variant="success" className="w-100" onClick={addPartner}>
                      Add Partner
                    </Button>
                  </Col>
                </Row>
              </Form>

              {successMsg && <Alert variant="success">{successMsg}</Alert>}
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

              {addedPartner && (
                <Card className="mb-3 p-3 bg-light text-dark border-success">
                  <strong>New Partner:</strong> {addedPartner.name} ({addedPartner.email})
                </Card>
              )}

              <Table striped bordered hover responsive className="mt-4 bg-light text-dark">
                <thead className="table-dark">
                  <tr>
                    <th style={{ minWidth: '180px' }}>Name</th>
                    <th style={{ minWidth: '220px' }}>Email</th>
                    <th style={{ minWidth: '120px' }}>Status</th>
                    <th style={{ minWidth: '160px' }}>Orders Completed</th>
                    <th style={{ minWidth: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.length > 0 ? (
                    partners.map((partner) => (
                      <tr key={partner._id}>
                        <td>{partner.name}</td>
                        <td>{partner.email}</td>
                        <td>{partner.status}</td>
                        <td>{partner.ordersCompleted || 0}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removePartner(partner._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No partners found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManagePickupPartners;
