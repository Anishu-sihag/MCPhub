import React from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';

const OrderList = () => {
  const orders = [
    { id: 'ORD001', customer: 'Amit Sharma', status: 'Pending', assignedTo: null },
    { id: 'ORD002', customer: 'Priya Verma', status: 'Assigned', assignedTo: 'Partner A' },
    { id: 'ORD003', customer: 'Rahul Mehta', status: 'Pending', assignedTo: null },
  ];

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#2e2e2e' }}>
      <Container className="d-flex justify-content-center">
        <Card className="shadow w-100" style={{ maxWidth: '800px', backgroundColor: '#3a3a3a', color: 'white' }}>
          <Card.Body>
            <h4 className="mb-4 text-white">Order Assignment</h4>
            <Table responsive bordered hover className="text-white">
              <thead style={{ backgroundColor: '#4b4b4b', color: 'white' }}>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.status}</td>
                    <td>{order.assignedTo || 'Not Assigned'}</td>
                    <td>
                      {order.status === 'Pending' ? (
                        <Button size="sm" variant="primary">Assign</Button>
                      ) : (
                        <Button size="sm" variant="secondary" disabled>Assigned</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OrderList;
