import React, { useEffect } from 'react';
import axios from 'axios'

import Home from './Pages/Home';
import HeatMap from './Pages/HeatMap';
import Timeline from './Pages/Timeline';
import History from './Pages/History';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkDbStatus, getAllErrors, getServices, getConnections, enableFrontend } from './Redux/errorSlice';


export default function App() {

  const { checking, frontend, scanned, allErrors } = useSelector(state => state.errorSlice)

  const dispatch = useDispatch();

  useEffect(() => {

    //adjust for scanned?
    if (checking === false && frontend === false) {
      dispatch(enableFrontend())
    }
  }, [allErrors])


  useEffect(() => {

    if (checking) {
      dispatch(checkDbStatus())
    } else if (!scanned) {
      dispatch(getAllErrors())
      dispatch(getServices())
      dispatch(getConnections())
    }

  }, [checking])

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heatmap" element={<HeatMap />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/history" element={<History />} />
        </Routes>

      </Router>
    </>
  )


}