import React from "react";

import TimelineNode from './TimelineNode'
import TimelineHatch from './TimelineHatch'

import { useSelector, useDispatch } from 'react-redux'



export default function TimelineGraph(props) {

    const { min, max } = useSelector(state => state.timeline);




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
            output.push(<TimelineHatch percentage={percent} />)
        }

        return output
    }



    return (
        <div className='graph'><h1>{min}</h1>
            <div className='graph-line'>
                {hatchGenerator(["0%", "25%", "50%", "75%", "100%"])}

                {/* {[<TimelineHatch percentage="5%" />, <TimelineHatch percentage="55%" />]} */}
                <TimelineNode percentage={`${100 - 1.3636363636}%`} color={"yellow"} />
                <TimelineNode percentage={`${88 - 1.3636363636}%`} color={"blue"} />
                <TimelineNode percentage={`${89 - 1.3636363636}%`} color={"orange"} />

            </div><h1>{max}</h1>

            {/* {nodeGenerator()} */}
        </div>
    )

}