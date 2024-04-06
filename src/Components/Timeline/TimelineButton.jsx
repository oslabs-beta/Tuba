import React from 'react';

import { useSelector, useDispatch } from 'react-redux'


export default function timelineButton(props) {

    const dispatch = useDispatch()

  



    return (
        <div className='timelineButton' onClick={props.handle}>{props.text}</div>
    )


}