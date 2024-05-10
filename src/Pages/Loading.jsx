import React from 'react'

export default function Loading() {

    return (
        <div className='component'>
            <div className='loadingComponent'>
                <p>Fetching Errors from Database</p>

                {/* <p>Reminder: to instantiate database, send a get request via Postman to 'http://localhost:42069/setup/'. If sent correctly, you should receieve a 200 code with the response "Tuba database instantiated."
                </p> */}
            </div>
        </div>
    )

}