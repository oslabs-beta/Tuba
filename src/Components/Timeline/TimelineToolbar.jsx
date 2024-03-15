import React from "react";

import { useSelector, useDispatch } from 'react-redux'
import { setStart, setEnd, setCenter, setElapsed, setZoom, setNudge, setCascade } from '../../Redux/timelineSlice'

export default function TimelineToolbar() {

    const dispatch = useDispatch();

    const { start, end, center, elapsed, zoom, nudge, cascade, hatch25, hatch75, filtered } = useSelector(state => state.timeline);
    const { startInput, endInput, centerInput, elapsedInput, zoomInput, nudgeInput, cascadeInput } = useSelector(state => state.timeline);

    //get all errors from redux
    // const allErrors = useSelector(state.errorSlice.allErrors);

    const submitStart = (event) => {
        dispatch(setStart(event.target.value))
    }

    const submitEnd = (event) => {
        dispatch(setEnd(event.target.value))
    }

    const submitCenter = (event) => {
        dispatch(setCenter(event.target.value))
    }

    const submitElapsed = (event) => {
        dispatch(setElapsed(event.target.value))
    }

    const submitZoom = (event) => {
        dispatch(setZoom(event.target.value))
    }

    const submitNudge = (event) => {
        dispatch(setNudge(event.target.value))
    }

    const submitCascade = (event) => {
        dispatch(setCascade(event.target.value))
    }


    return (
        <div className='toolbar'>
            <div className='toolbarInputs'>
                {/* <label for='start'>Start</label>
                <input type='text' name='start' value={startInput} onInput={submitStart} />
                <label for='end'>End</label> */}
                {/* <input type='text' name='end' value={endInput} onInput={submitEnd} /> */}
                <label for='center'>Center</label>
                <input type='text' name='center' value={centerInput} onInput={submitCenter} />
                <label for='elapsed'>Elapsed Time</label>
                <input type='text' name='elapsed' value={elapsedInput} onInput={submitElapsed} />
                <label for='zoom'>Zoom Amount</label>
                <input type='text' name='zoom' value={zoomInput} onInput={submitZoom} />
                <label for='cascade'>Cascade Time</label>
                <input type='text' name='cascade' value={cascadeInput} onInput={submitCascade} />
                <label for='nudge'>Nudge</label>
                <input type='text' name='nudge' value={nudgeInput} onInput={submitNudge} />


            </div>
        </div>
    )

}