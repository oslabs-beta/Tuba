import React from 'react';

import { Chrono } from "react-chrono";

import { useSelector, useDispatch } from 'react-redux'


import TimelineGraph from '../Components/Timeline/TimelineGraph'
import TimelineToolbar from '../Components/Timeline/TimelineToolbar'
import TimelineButton from '../Components/Timeline/TimelineButton'
import TimelineDescription from '../Components/Timeline/TimelineDescription'


import { setVisible, reCenterNodes, nudgeRight, nudgeLeft, zoomIn, zoomOut } from '../Redux/timelineSlice'



export default function Timeline() {

    const errorData = useSelector(state => state.errorSlice.allErrors)
    const { selected, visible } = useSelector(state => state.timeline)

    console.log('error data: ', errorData)
    // console.log('errorData2: ', useSelector(state => state.errorSlice))


    const dispatch = useDispatch();

    const handleNudgeLeft = () => {
        dispatch(nudgeLeft(errorData))
    }
    const handleNudgeRight = () => {
        dispatch(nudgeRight(errorData))
    }
    const handleReCenter = () => {
        dispatch(reCenterNodes(errorData))
    }
    const handleZoomOut = () => {
        dispatch(zoomOut(errorData))
    }
    const handleZoomIn = () => {
        dispatch(zoomIn(errorData))
    }

    const handleToolbar = () => {
        dispatch(setVisible())

    }




    return (

        <div className='component'>
            <div className='timelineComponent'>
                <TimelineGraph />
                <div className='timelineButtonSection'>

                    <TimelineButton text="⫷" handle={handleNudgeLeft} />
                    <TimelineButton text="⫸" handle={handleNudgeRight} />
                    <TimelineButton text="║" handle={handleReCenter} />
                    <TimelineButton text="T" handle={handleToolbar} />
                    <TimelineButton text="－" handle={handleZoomOut} />
                    <TimelineButton text="＋" handle={handleZoomIn} />


                </div>
                {visible && <TimelineToolbar />}
                {selected && <TimelineDescription />}
            </div>

        </div>

    )


}

