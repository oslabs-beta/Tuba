import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Loading() {
    const description = useSelector(state => state.errorSlice.description)
    return (
        <div className='component'>
            <div className='loadingComponent'>
                <p>{description}</p>
            </div>
        </div>
    )
}