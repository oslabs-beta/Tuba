import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllErrors, getServices } from '../Redux/errorSlice';

import Nav from '../Components/Nav';



export default function Dashboard() {

    const dispatch = useDispatch();

    // const getAllErrors = useSelector(state => state.errorSlice.allErrors)

    const errorData = useSelector(state => state.errorSlice.allErrors)

    console.log('ErrorData from state: ', errorData)


    return (

        <div className='component'>
            Dashboard goes here!

            <button onClick={() => {
                dispatch(getAllErrors()) 
                dispatch(getServices())
                }}>Click for Errors</button>

        </div>

    )


}