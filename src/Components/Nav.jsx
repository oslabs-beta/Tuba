import React from 'react'

import { useNavigate } from "react-router-dom";



export default function Nav() {

    const navigate = useNavigate();

    return (
        <div className='nav-background'>

            <ul>
                <li onClick={() => {
                    navigate('/heatmap')
                }}><a>Heat Map</a></li>
                <li onClick={() => {
                    navigate('/timeline')
                }}><a>Timeline</a></li>
                <li onClick={() => {
                    navigate('/history')
                }}><a>History</a></li>
            </ul>
        </div>
    )


}