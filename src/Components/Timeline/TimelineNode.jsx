import React from "react";

export default function TimelineNode({ percentage, text, color }) {

    const style = {
        marginLeft: percentage,
        backgroundColor: color
    }

    return (
        <div className='graph-node' style={style}>
            {text}
        </div>
    )

}