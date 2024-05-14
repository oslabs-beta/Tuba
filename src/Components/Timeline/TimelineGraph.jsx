import React from "react";
import TimelineNode from './TimelineNode'
import TimelineHatch from './TimelineHatch'
import { msToString } from '../../Utilities/timeFunctions';
import { setSelected } from '../../Redux/timelineSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function TimelineGraph(props) {
    const dispatch = useDispatch()
    const { start, end, center, hatch25, hatch75, elapsed, filtered } = useSelector(state => state.timeline);
    const timestamp = (msInput) => {
        return elapsed < 86400000 ? msToString(msInput).time : msToString(msInput).date
    }

    function nodeHandler(id) {
        dispatch(setSelected(id))
    }

    function nodeGenerator() {
        function cascade(node) {
            if (node.cascade) {
                return true
            } return false
        }
        const nodes = [];
        for (let node of filtered) {
            const elapsedTime = node.err_time - start;
            const percentage = 100 * elapsedTime / elapsed - 1.66666666666666;
            nodes.push(<TimelineNode id={node.err_id} handler={nodeHandler} percentage={`${percentage}%`} letter={node.err_type} data={node} cascade={cascade(node)} color={"orange"} />)
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
                {nodeGenerator()}
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
        </div>
    )
}