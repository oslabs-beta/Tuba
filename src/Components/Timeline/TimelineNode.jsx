import React from "react";
import { Colors } from "../../Utilities/Colors";

export default function TimelineNode({ data, handler, id, percentage, letter, color, cascade }) {

    const modId = (Number(data.err_srv_id)) % 10;
    const colors = Colors();

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