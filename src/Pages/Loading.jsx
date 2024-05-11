import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


export default function Loading() {

    const description = useSelector(state => state.errorSlice.description)

    return (
        <div className='component'>
            <div className='loadingComponent'>
                <p>{description}</p>

                {/* <p>Reminder: to instantiate database, send a get request via Postman to 'http://localhost:42069/setup/'. If sent correctly, you should receieve a 200 code with the response "Tuba database instantiated."
                </p> */}
            </div>
        </div>
    )

}