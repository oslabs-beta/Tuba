import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { stringToMs, msToString } from '../../Utilities/timeFunctions';


import { toggleFavorite } from '../../Redux/errorSlice';


export default function HistoryHeader({ info }) {

    const selected = info.err_id

    const dispatch = useDispatch()

    function handleCheck() {
        dispatch(toggleFavorite(selected))

    }





    return (
        <div className='historyHeader'>
            <p>{msToString(Number(info.err_time)).date}</p>
            <p>{msToString(Number(info.err_time)).time}</p>
            <p>{info.err_type}</p>
            <p>{info.err_job_name}</p>
            <p onClick={handleCheck}>{info.favorite ? "☑" : "☐"}</p>
        </div>

    )

}