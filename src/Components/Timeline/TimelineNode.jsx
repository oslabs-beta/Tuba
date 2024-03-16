import React from "react";

export default function TimelineNode({ percentage, letter, color, cascade }) {


    const style = {
        marginLeft: percentage,
        backgroundColor: color,

    }

    const cascadeObject = {
        backgroundColor: 'grey',
        marginTop: '-25px',
        scale: '.8'
    }





    return (
        <div className='graph-node' id= {cascade ? 'cascade' : ''} style={style}>
            {letter.toUpperCase().slice(0, 1)}
        </div>
    )

}