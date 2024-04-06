import React from 'react';

import { useSelector, useDispatch } from 'react-redux'

import HistoryBody from './HistoryBody'
import HistoryHeader from './HistoryHeader'

export default function HistoryContainer({ info }) {


    return (
        <div className='historyContainer'>
            <HistoryHeader info={info} />
            {/* <HistoryBody info={info} /> */}
        </div>

    )

}