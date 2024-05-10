import React, { useEffect } from 'react';
import axios from 'axios'

import Home from './Pages/Home';
import HeatMap from './Pages/HeatMap';
import Timeline from './Pages/Timeline';
import History from './Pages/History';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllErrors, getServices, getConnections } from './Redux/errorSlice';


export default function App() {



  const dispatch = useDispatch();

  async function initialScan() {

    let hasRun = false
    console.log('in initialScan')

    const response = await axios.get('/setup/check');



    if (!response.data) return () => {
      console.log('Unsuccessful Database Connection')
    };


    console.log('end')
    return () => {
      console.log('initalScan triggered')
      console.log('hasRun ===', hasRun, 'check: ', response.data)
      if (hasRun === false && response.data === true) {
        console.log('passing dispatch test!')
        dispatch(getAllErrors())
        dispatch(getServices())
        dispatch(getConnections())
        hasRun = true;
      } else {
        console.log(' failed')
      }
    }





  }

  useEffect(() => {
    console.log('before invoking constructor')

    initialScan().then(inner => inner())

    // const scan1 = initialScan()
    // scan1()


    console.log('scan complete')
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