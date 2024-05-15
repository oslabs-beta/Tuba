import React from 'react';
import { useDispatch } from 'react-redux'
import HistoryBody from './HistoryBody'
import HistoryHeader from './HistoryHeader'
import { setVisibility } from '../../Redux/errorSlice'

export default function HistoryContainer({ info }) {

    const dispatch = useDispatch();
    function handleClick(id) {
        dispatch(setVisibility(id))
    }
    return (
        <div className='historyContainer' >
            <HistoryHeader info={info} handleButton={() => handleClick(Number(info.err_id))} />
            {info.visible && <HistoryBody info={info} handleButton={() => handleClick(Number(info.err_id))} />}
        </div>
    )
}