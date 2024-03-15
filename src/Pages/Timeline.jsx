import React from 'react';

import { Chrono } from "react-chrono";

import { useSelector, useDispatch } from 'react-redux'


import TimelineGraph from '../Components/Timeline/TimelineGraph'
import TimelineToolbar from '../Components/Timeline/TimelineToolbar'
import TimelineButton from '../Components/Timeline/TimelineButton'

import { nudgeRight, nudgeLeft } from '../Redux/timelineSlice'



export default function Timeline() {

    const dispatch = useDispatch();








    // const errors = [{
    //     title: "May 1940",
    //     cardTitle: "Dunkirk",
    //     url: "http://www.history.com",
    //     cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
    //     cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    //     media: {
    //         type: "IMAGE",
    //         source: {
    //             url: "http://someurl/image.jpg"
    //         }
    //     }
    // },
    // {
    //     title: "May 1941",
    //     cardTitle: "Pearl Harbor",
    //     url: "http://www.history.com",
    //     cardSubtitle: "Men of the Us get destroyed",
    //     cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    //     media: {
    //         type: "IMAGE",
    //         source: {
    //             url: "http://someurl/image.jpg"
    //         }
    //     }
    // },
    // {
    //     title: "May 1949",
    //     cardTitle: "Pearl Harbor",
    //     url: "http://www.history.com",
    //     cardSubtitle: "Men of the Us get destroyed",
    //     cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    //     media: {
    //         type: "IMAGE",
    //         source: {
    //             url: "http://someurl/image.jpg"
    //         }
    //     }
    // }

    // ];

    const handleNudgeLeft = () => {
        console.log("click")
        dispatch(nudgeLeft())
    }

    const handleNudgeRight = () => {
        console.log("click")
        dispatch(nudgeRight())
    }


    return (

        <div className='component'>
            <div className='timelineComponent'>
                <TimelineGraph />
                <div className='timelineButtonSection'>
                    <TimelineButton text="⫷" handle={handleNudgeLeft} />
                    <TimelineButton text="⫸" handle={handleNudgeRight} />
                    <TimelineButton text="－" />
                    <TimelineButton text="＋" />
                    <TimelineButton text="║" />

                </div>
                <TimelineToolbar />
            </div>

            {/* <div style={{ width: "1100px", height: "700px" }}>
                <Chrono
                    items={errors}
                    mode="HORIZONTAL"
                    showAllCardsHorizontal
                    cardWidth={450}
                    cardHeight={300}
                    disableToolbar="true"
                    contentDetailsHeight={100}
                    fontSizes={{
                        title: "1rem"
                    }}
                    slideShow
                />
                {/* <Chrono items={errors} mode="HORIZONTAL" cardLess="false" toolbarPosition="bottom" /> */}
            {/* </div> */}
        </div>

    )


}

