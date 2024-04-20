import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllErrors, getServices, getConnections } from '../Redux/errorSlice';

import Nav from '../Components/Nav';



export default function Dashboard() {

    const dispatch = useDispatch();

    // const getAllErrors = useSelector(state => state.errorSlice.allErrors)

    const favoriteErrors = useSelector(state => state.errorSlice.allErrors).filter(error => error.favorite)

    console.log('Favorites: ', favoriteErrors)


    return (

        <div className='component'>
            Dashboard goes here!

            <button onClick={() => {
                dispatch(getAllErrors())
                dispatch(getServices())
                dispatch(getConnections())
            }}>Click for Errors</button>

        </div>

    )


}