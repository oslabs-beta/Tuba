import React from 'react';
import { useDispatch } from 'react-redux'
import { msToString } from '../../Utilities/timeFunctions';
import { toggleFavorite } from '../../Redux/errorSlice';
export default function HistoryHeader({ info, handleButton }) {

    const selected = info.err_id
    const dispatch = useDispatch()
    function handleCheck() {
        dispatch(toggleFavorite(selected))
    }

    return (
        <div className='historyHeader'>
            <p onClick={handleButton}>{msToString(Number(info.err_time)).date}</p>
            <p onClick={handleButton}>{msToString(Number(info.err_time)).time}</p>
            <p onClick={handleButton}>{info.err_type}</p>
            <p onClick={handleButton}>{info.err_job_name}</p>
            <p onClick={handleCheck}>{info.favorite ? "☑" : "☐"}</p>
        </div>
    )
}