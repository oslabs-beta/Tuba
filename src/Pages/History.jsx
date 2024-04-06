import React from 'react';

import HistoryContainer from '../Components/History/HistoryContainer'

import { useSelector, useDispatch } from 'react-redux'



export default function History() {

    const allErrors = useSelector(state => state.errorSlice.allErrors)


    const errors = allErrors.map(error => {
        return <HistoryContainer info={error} />
    })

    return (

        <div className='component'>
            <div className='historyList'>
                <h2>Error Log</h2>
                {errors}
            </div>
        </div>

    )


}