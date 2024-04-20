import React from "react";

export default function TimelineNode({ data, handler, id, percentage, letter, color, cascade }) {




    const modId = (Number(data.err_srv_id)) % 10;

    const colors = [
        "#FF6347", // Tomato
        "#FF4500", // Orange Red
        "#FF8C00", // Dark Orange
        "#FFD700", // Gold
        "#ADFF2F", // Green Yellow
        "#32CD32", // Lime Green
        "#4169E1", // Royal Blue
        "#8A2BE2", // Blue Violet
        "#FF1493", // Deep Pink
        "#A0522D"  // Sienna
    ]


    const style = {
        marginLeft: percentage,
        backgroundColor: colors[modId],

    }

    const cascadeObject = {
        backgroundColor: 'grey',
        marginTop: '-25px',
        scale: '.8'
    }





    return (
        <div className='graph-node' id={cascade ? 'cascade' : ''} style={style} onClick={() => handler(id)}>
            {letter.toUpperCase().slice(0, 1)}
        </div>
    )

}