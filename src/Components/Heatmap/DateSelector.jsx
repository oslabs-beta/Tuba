import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, setStart, setEnd } from '../../Redux/heatSlice';

export default function DateSelector() {

    const dispatch = useDispatch()

    const start = useSelector(state => state.heat.start)
    const end = useSelector(state => state.heat.end)

    function toggleStart(event) {
        console.log('start target value, ', event.target.value)
        dispatch(setStart(event.target.value))

    }

    function toggleEnd(event) {
        dispatch(setEnd(event.target.value))

    }


    return (
        <div className='dateSelector'>
            <input type='date' onChange={toggleStart} value={start}></input><h3>Through</h3>

            <input type='date' onChange={toggleEnd} value={end}></input>

        </div>
    )


}