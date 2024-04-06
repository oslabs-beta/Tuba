import React from 'react';

import { useSelector, useDispatch } from 'react-redux'

import HistoryBody from './HistoryBody'
import HistoryHeader from './HistoryHeader'

import { setVisibility } from '../../Redux/errorSlice'


export default function HistoryContainer({ info }) {

    const dispatch = useDispatch();

    function handleClick(id) {
        dispatch(setVisibility(id))

    }


    return (
        <div className='historyContainer' onClick={() => handleClick(Number(info.err_id))}>
            <HistoryHeader info={info} />
            {info.visible && <HistoryBody info={info} />}
        </div>

    )

}