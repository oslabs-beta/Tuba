import React from 'react';

import Dashboard from './Pages/Dashboard';
import HeatMap from './Pages/HeatMap';
import Timeline from './Pages/Timeline';
import History from './Pages/History';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {

    return (
        <>
       
            <Router>
                <Routes>
                    

                    <Route path="/" element={<Dashboard />} />
                    <Route path="/heatmap" element={<HeatMap />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/history" element={<History />} />
                </Routes>
                
            </Router>
        </>
    )


}