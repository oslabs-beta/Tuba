import React from 'react';

import { Chrono } from "react-chrono";
import TimelineGraph from '../Components/TimelineGraph'
import TimelineToolbar from '../Components/TimelineToolbar'
import TimelineButton from '../Components/TimelineButton'



export default function Timeline() {

    /*

NEEDS:

-Retrieve errors from redux

1)Filter Dates
    - front end that allows start and end date and places in filtered part of slice

    */








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

    return (

        <div className='component'>
            <div className='timelineComponent'>
                <TimelineGraph />
                <div className='timelineButtonSection'>
                    <TimelineButton text="⫷" />
                    <TimelineButton text="⫸" />
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

