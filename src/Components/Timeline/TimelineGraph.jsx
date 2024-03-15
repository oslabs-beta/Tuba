import React from "react";

import TimelineNode from './TimelineNode'
import TimelineHatch from './TimelineHatch'

import { stringToMs, msToString } from '../../Utilities/timeFunctions';



import { useSelector, useDispatch } from 'react-redux'



export default function TimelineGraph(props) {


    const { start, end, center, hatch25, hatch75, elapsed } = useSelector(state => state.timeline);

    const timestamp = (msInput) => {
        return elapsed < 86400000 ? msToString(msInput).time : msToString(msInput).date
    }




    function nodeGenerator(input) {
        //every range of dates is theroetically just a different array of objects
        // imagine its already arrived filtered.
        const nodes = [];
        const sorted = input.sort((a, b) => a.timestamp - b.timestamp);
        //sort array by timestamp starting with earliest.
        const first = sorted[0].timestamp;
        const last = sorted[sorted.length - 1].timestamp;
        const diff = last - first;

        for (let node of sorted) {
            const elapsedTime = node.timestamp - first;
            const percentage = 100 * elapsedTime / diff;
            //do we dispatch here instead so this is cached in state?
            nodes.push(<TimelineNode percentage={percentage} data={node} key={node} />)
        }
        return nodes;
    }

    function hatchGenerator(arr) {
        const output = []
        for (let percent of arr) {
            output.push(<TimelineHatch percentage={`${percent - .125}%`} />)
        }

        return output
    }



    return (
        <div className='graph'>
            <div className='graph-line'>
                {hatchGenerator([0, 25, 50, 75, 100])}

                {
                    <TimelineNode percentage={`${0 - 1.66666666}%`} text="M" color={"orange"} />
                /* {[<TimelineHatch percentage="5%" />, <TimelineHatch percentage="55%" />]} */}
                <TimelineNode percentage={`${100 - 1.66666666}%`} color={"yellow"} />
                <TimelineNode percentage={`${88 - 1.66666666}%`} color={"blue"} />
                <TimelineNode percentage={`${89 - 1.66666666}%`} color={"orange"} />

            </div>
            <div className='ruler'>
                <div className='rulerContainer'>
                    <h2 className='timestamp'>{timestamp(start)}</h2>
                </div>
                <div className='rulerContainer'>
                    <h2 className='timestamp'>{timestamp(hatch25)}</h2>
                </div>
                <div className='rulerContainer'>
                    <h2 className='timestamp'>{timestamp(center)}</h2>
                </div>
                <div className='rulerContainer'>
                    <h2 className='timestamp'>{timestamp(hatch75)}</h2>
                </div>
                <div className='rulerContainer'>
                    <h2 className='timestamp'>{timestamp(end)}</h2>
                </div>
            </div>

            {/* {nodeGenerator()} */}
        </div>
    )

}