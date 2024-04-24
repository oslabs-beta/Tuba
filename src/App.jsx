import React, { useEffect } from 'react';

import Home from './Pages/Home';
import HeatMap from './Pages/HeatMap';
import Timeline from './Pages/Timeline';
import History from './Pages/History';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllErrors, getServices, getConnections } from './Redux/errorSlice';


export default function App() {

    const dispatch = useDispatch();

    function initialScan() {
      let hasRun = false;
      return () => {
        console.log('initalScan triggered')
        if(hasRun === false) {
          dispatch(getAllErrors())
          dispatch(getServices())
          dispatch(getConnections())
          hasRun = true;
        }
      }
    }

    useEffect(() => {
      const scan1 = initialScan()
      scan1();
    }, [])

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