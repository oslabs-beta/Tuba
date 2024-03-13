import React from "react";

export default function TimelineToolbar() {


    return (
        <div className='toolbar'>
            <div className='toolbarInputs'>
                <label for='timeA'>Time A</label>
                <input type='text' name='timeA' />
                <label for='timeB'>Time B</label>
                <input type='text' name='timeB' />
                <label for='center'>Center</label>
                <input type='text' name='center' />
                <label for='snippet'>Snippet</label>
                <input type='text' name='snippet' />
                <label for='magnification'>Magnification</label>
                <input type='text' name='magnification' />
                <label for='significance'>Significance</label>
                <input type='text' name='significance' />
                <label for='filter'>Filter</label>
                <input type='text' name='filter' />


            </div>
        </div>
    )

}