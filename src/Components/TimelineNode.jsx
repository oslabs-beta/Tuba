import React from "react";

export default function TimelineNode({ percentage, data, color }) {

    const style = {
        marginLeft: percentage,
        backgroundColor: color
    }

    return (
        <div className='graph-node' style={style}>
            <div></div>
        </div>
    )

}