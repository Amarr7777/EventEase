import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

function AppRoutes() {
  const [eventsFetched,setEventsFetched] = useState(false)
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard eventsFetched={eventsFetched} setEventsFetched={setEventsFetched}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes