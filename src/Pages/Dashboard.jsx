import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllErrors } from '../Redux/errorSlice';

import Nav from '../Components/Nav';



export default function Dashboard() {
  
    const dispatch = useDispatch();

    

    const errorData = useSelector(state => state.errorSlice.allErrors)
    
    console.log('ErrorData from state: ', errorData)

    return (

        <div className='component'>
            Dashboard goes here!

            <button onClick={()=>dispatch(getAllErrors())}>Click for Errors</button>

        </div>

    )


}