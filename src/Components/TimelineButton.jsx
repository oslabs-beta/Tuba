import React from 'react';

export default function timelineButton(props) {
    return (
        <div className='timelineButton' onClick={props.handle}>{props.text}</div>
    )


}