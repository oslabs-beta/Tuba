import React from 'react';


export default function StandardBlock({ body, id, handle }) {


    return (
        <div className='standardBlock'>
            {!id && body}
            {id && <div onClick={() => handle(id)}>☑</div>}
        </div>
    )
}