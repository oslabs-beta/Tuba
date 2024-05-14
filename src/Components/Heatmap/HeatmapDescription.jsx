import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { msToString } from '../../Utilities/timeFunctions';
import { toggleFavorite } from '../../Redux/errorSlice';

export default function HeatmapDescription({ error }) {
    const dispatch = useDispatch()
    function handleCheck() {
        dispatch(toggleFavorite(Number(error.err_id)))
    }

    return (
        <div className='description'>
            <h3>Pin: </h3><h3 onClick={handleCheck} className='check'>{error.favorite ? "☑" : "☐"}</h3>
            <h3>Service:</h3><h3><span>{error.err_job_name}</span></h3>
            <h3>Type: </h3><h3><span>{error.err_type}</span></h3>
            <h3>Date: </h3><h3><span>{msToString(Number(error.err_time)).date}</span></h3>
            <h3>Time: </h3><h3><span>{msToString(Number(error.err_time)).time}</span></h3>
            <h3>Message: </h3><h3><span>{decodeURIComponent(error.err_message)}</span></h3>
            <h3>File: </h3><h3><span>{error.err_file}</span></h3>
            <h3>Path:</h3><h3> <span>{error.err_file_path}</span></h3>
            <h3>Line: </h3><h3><span>{error.err_line_num}</span></h3>
            <h3>Module: </h3><h3><span>{error.err_module}</span></h3>
            <h3>Stack:</h3><h3><span>{decodeURIComponent(error.err_stack)}</span></h3>
        </div>
    )
}