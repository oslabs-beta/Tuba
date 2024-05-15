import React from 'react';

export default function HistoryBody({ info, handleButton }) {

    return (
        <div className='historyBody' >
            <p>Message: </p><p><span>{decodeURIComponent(info.err_message)}</span></p>
            <p>File: </p><p><span>{info.err_file}</span></p>
            <p>Path:</p><p><span>{info.err_file_path}</span></p>
            <p>Line: </p><p><span>{info.err_line_num}</span></p>
            <p>Module: </p><p><span>{info.err_module}</span></p>
            <p>Stack:</p><p><span>{decodeURIComponent(info.err_stack)}</span></p>
        </div>
    )
}