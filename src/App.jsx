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


  const { loading, frontend } = useSelector(state => state.errorSlice)
  const errors = useSelector(state => state.errorSlice.allErrors)

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading === false && frontend === false)
      dispatch(enableFrontend())
  }, [errors])

  async function initialScan() {

    let hasRun = false
    dispatch(checkDbStatus())

    return () => {
      // console.log('initalScan triggered')
      // console.log('hasRun ===', hasRun, 'check: ', response.data)
      if (hasRun === false && loading === false) {
        // console.log('passing dispatch test!')
        // dispatch(checkDbStatus())
        console.log('about to dispatch website')
        dispatch(getAllErrors())
        dispatch(getServices())
        dispatch(getConnections())
        // dispatch(enableFrontend())

        console.log('website dispatched')
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
  }, [loading])

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