import React from 'react';
import { Chrono } from "react-chrono";
import { useSelector, useDispatch } from 'react-redux'
import TimelineGraph from '../Components/Timeline/TimelineGraph'
import TimelineToolbar from '../Components/Timeline/TimelineToolbar'
import TimelineButton from '../Components/Timeline/TimelineButton'
import TimelineDescription from '../Components/Timeline/TimelineDescription'
import { setIntervalId, setVisible, reCenterNodes, nudgeRight, nudgeLeft, zoomIn, zoomOut } from '../Redux/timelineSlice'

export default function Timeline() {
    const errorData = useSelector(state => state.errorSlice.allErrors)
    const { selected, visible } = useSelector(state => state.timeline)
    const dispatch = useDispatch();
    const handleNudgeLeft = () => {
        const id = setInterval(() => {
            dispatch(nudgeLeft(errorData))
        }, 50)
        dispatch(setIntervalId(id))
    }
    const handleNudgeRight = () => {
        const id = setInterval(() => {
            dispatch(nudgeRight(errorData))
        }, 50)
        dispatch(setIntervalId(id))
    }
    const handleReCenter = () => {
        const id = setInterval(() => {
            dispatch(reCenterNodes(errorData))
        }, 50)
        dispatch(setIntervalId(id))
    }
    const handleZoomOut = () => {
        const id = setInterval(() => {
            dispatch(zoomOut(errorData))
        }, 50)
        dispatch(setIntervalId(id))
    }
    const handleZoomIn = () => {
        const id = setInterval(() => {
            dispatch(zoomIn(errorData))
        }, 50)
        dispatch(setIntervalId(id))
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