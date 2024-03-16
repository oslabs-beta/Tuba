import React from 'react'

import Nav from '../Components/Nav'
import Dashboard from './Dashboard'
import HeatMap from './HeatMap'
import History from './History'
import Timeline from './Timeline'

import { changeTab } from '../Redux/navSlice'

import { useSelector, useDispatch } from 'react-redux'

export default function Home() {

    const dispatch = useDispatch();

    const { tab, left, right } = useSelector(state => state.nav);


    const displayCurrentTab = () => {

        if (tab === 'Dashboard') {
            return <Dashboard />
        } else if (tab === 'Timeline') {
            return <Timeline />
        } else if (tab === 'Heat Map') {
            return <HeatMap />
        } else if (tab === 'History') {
            return <History />
        }

    }


    const changeTabHandler = (string) => {
        dispatch(changeTab(string))

        return;
    }


    // const keyPress = (event) => {
    //     switch (event.key) {
    //         case "ArrowLeft":
    //             changeTabHandler(left);
    //             break;
    //         case "ArrowRight":
    //             changeTabHandler(right);
    //             break;
    //     }


    // }



    return (
        <>
            <Nav />
            {/* <h2>{tab}</h2> */}
            <div className='background' >
                {/* <div className='tab' onClick={() => changeTabHandler(left)}>{left}</div> */}
                {displayCurrentTab()}
                {/* <div className='tab' onClick={() => changeTabHandler(right)}>{right}</div> */}
            </div>

        </>
    )


}