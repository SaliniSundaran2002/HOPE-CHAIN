import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddCampaigns from './pages/AddCampaigns'
import HomePage from './pages/HomePage'
import ViewCamapigns from './pages/ViewCamapigns'

const App = () => {
  return (
    <Router>
    <div>
      <HomePage/>
      <Routes>
      <Route path='/add'element={<AddCampaigns/>} /> 
      <Route path='/view'element={<ViewCamapigns/>} /> 
      </Routes>
    </div>
    </Router>
  )
}

export default App