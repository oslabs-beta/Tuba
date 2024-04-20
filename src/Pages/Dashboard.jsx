import React from 'react';

import StandardBlock from '../Components/Dashboard/StandardBlock';
import LargeBlock from '../Components/Dashboard/LargeBlock';
import HeaderBlock from '../Components/Dashboard/HeaderBlock';


import { useDispatch, useSelector } from 'react-redux';
import { getAllErrors, getServices, getConnections } from '../Redux/errorSlice';
import { toggleFavorite } from '../Redux/errorSlice';
import { msToString } from '../Utilities/timeFunctions';



export default function Dashboard() {

    const dispatch = useDispatch();

    function handleClick(id) {
        dispatch(toggleFavorite(id))

    }

    // const getAllErrors = useSelector(state => state.errorSlice.allErrors)

    const favoriteErrors = useSelector(state => state.errorSlice.allErrors).filter(error => error.favorite)

    console.log('Favorites: ', favoriteErrors)

    const dashboardMap = favoriteErrors.map(error => {


        return (
            < div className='dashboardVertical' >

                <StandardBlock body={'☑'} handle={handleClick} id={error.err_id} />
                <StandardBlock body={msToString(Number(error.err_time)).date} />
                <StandardBlock body={msToString(Number(error.err_time)).time} />
                <StandardBlock body={error.err_job_name} />
                <StandardBlock body={error.err_type} />
                <StandardBlock body={decodeURIComponent(error.err_message)} />
                <StandardBlock body={error.err_file} />
                <StandardBlock body={error.err_file_path} />
                <StandardBlock body={error.err_line_num} />
                <StandardBlock body={error.err_module} />
                <LargeBlock body={decodeURIComponent(error.err_stack)} />
            </div >
        )
    })

    const headers = (
        <div className='dashboardHeader'>
            <HeaderBlock body={'Favorite:'} />
            <HeaderBlock body={'Date:'} />
            <HeaderBlock body={'Time:'} />
            <HeaderBlock body={'Service:'} />
            <HeaderBlock body={'Type:'} />
            <HeaderBlock body={'Message:'} />
            <HeaderBlock body={'File:'} />
            <HeaderBlock body={'Path:'} />
            <HeaderBlock body={'Line:'} />
            <HeaderBlock body={'Module:'} />
            <HeaderBlock body={'Stack:'} />


        </div>
    )


    return (

        <div className='component'>

            <button onClick={() => {
                dispatch(getAllErrors())
                dispatch(getServices())
                dispatch(getConnections())
            }}>Click For Errors</button>


            {favoriteErrors.length >= 1 && <div id='fullContainer'>
                {headers}
                <div id='dashboardContainer'>

                    {[dashboardMap]}
                </div>
            </div>}

        </div>






    )


}