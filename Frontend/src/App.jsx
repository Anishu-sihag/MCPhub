import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderList from './Pages/OrderList.jsx';
import MCPDashboard from './Pages/MCPDashboard.jsx';
import TransactionHistory from './Pages/TransactionID.jsx';
import ManagePickupPartners from './Pages/ManagePickup.jsx';
import AddFunds from './Pages/AddFund.jsx';

function App() {
 

  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<MCPDashboard/>} />
        <Route path="/Orderlist" element={<OrderList/>} />
        <Route path="/Transactionhistory" element={<TransactionHistory/>} />
        <Route path="/Managepickup" element={<ManagePickupPartners/>} />
        <Route path="/add-funds" element={<AddFunds/>}/>
      </Routes>
      <ManagePickupPartners/>
      <TransactionHistory/>
      <OrderList/>
    </Router>
    </>
  )
}

export default App
