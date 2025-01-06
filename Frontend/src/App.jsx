import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCampaigns from './components/AddCampaigns';
import HomePage from './components/HomePage';
import ViewCamapigns from './components/ViewCamapigns';
import WithdrawFunds from './components/WithdrawFunds';
import AllDonations from './components/AllDonations';
import Index from './components/Index';
// import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        {/* <Header/> */}
        <Routes>
          {/* Root Route */}
          <Route path='/' element={<Index />} />

          {/* Home and Other Pages */}
          <Route path='/home' element={<HomePage />} />
          <Route path='/add' element={<AddCampaigns />} />
          <Route path='/view' element={<ViewCamapigns />} />
          <Route path='/withdraw' element={<WithdrawFunds />} />
          <Route path='/allDonations' element={<AllDonations />} />

        </Routes>
        <div className="mt-5">
        <Footer/>
        </div>
        
      </div>
    </Router>
  );
};

export default App;
