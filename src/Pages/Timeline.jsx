import React from 'react';

import { Chrono } from "react-chrono";

import { useSelector, useDispatch } from 'react-redux'


import TimelineGraph from '../Components/Timeline/TimelineGraph'
import TimelineToolbar from '../Components/Timeline/TimelineToolbar'
import TimelineButton from '../Components/Timeline/TimelineButton'

import { reCenterNodes, nudgeRight, nudgeLeft, zoomIn, zoomOut } from '../Redux/timelineSlice'



export default function Timeline() {

    const dispatch = useDispatch();

    const handleNudgeLeft = () => {
        dispatch(nudgeLeft())
    }
    const handleNudgeRight = () => {
        dispatch(nudgeRight())
    }
    const handleReCenter = () => {
        dispatch(reCenterNodes())
    }
    const handleZoomOut = () => {
        dispatch(zoomOut())
    }
    const handleZoomIn = () => {
        dispatch(zoomIn())
    }




    return (

        <div className='component'>
            <div className='timelineComponent'>
                <TimelineGraph />
                <div className='timelineButtonSection'>

                    <TimelineButton text="⫷" handle={handleNudgeLeft} />
                    <TimelineButton text="⫸" handle={handleNudgeRight} />
                    <TimelineButton text="║" handle={handleReCenter} />
                    <TimelineButton text="－" handle={handleZoomOut} />
                    <TimelineButton text="＋" handle={handleZoomIn} />


                </div>
                <TimelineToolbar />
            </div>

        </div>

    )


}

