import React from 'react';
import { useSelector } from 'react-redux'

export default function timelineButton(props) {
    const intervalId = useSelector(state => state.timeline.intervalId);
    function handleMouseUp() {
        clearInterval(intervalId)
        return;
    }
    return (
        <div className='timelineButton' onMouseDown={props.handle} onClick={handleMouseUp}>{props.text}</div>
    )
}