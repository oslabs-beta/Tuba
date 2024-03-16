import React from 'react';

export default function timelineHatch({ percentage }) {

    const style = {
        marginLeft: percentage
    }
    return (
        <div className='hatch' style={style}>
        </div >
    )

}