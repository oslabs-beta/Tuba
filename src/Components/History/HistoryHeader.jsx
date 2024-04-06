import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { stringToMs, msToString } from '../../Utilities/timeFunctions';


export default function HistoryHeader({ info }) {


    return (
        <div className='historyHeader'>
            <p>{msToString(Number(info.err_time)).date}</p>
            <p>{msToString(Number(info.err_time)).time}</p>
            <p>{info.err_type}</p>
            <p>{info.err_job_name}</p>
        </div>

    )

}