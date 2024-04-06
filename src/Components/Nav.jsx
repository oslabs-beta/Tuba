import React from 'react'

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { changeTab } from '../Redux/navSlice'

import tubaLogo from '../Images/TubaLogo.png'





export default function Nav() {

    const dispatch = useDispatch();

    const changeTabHandler = (string) => {
        dispatch(changeTab(string))

        return;
    }

    const tabs = ['Dashboard', 'Timeline', 'Heat Map', 'History'].map((tab) => {
        return tab === useSelector(state => state.nav.tab) ?
            <li onClick={() => changeTabHandler(tab)} className='selected'><a>{tab}</a></li> :
            <li onClick={() => changeTabHandler(tab)}><a>{tab}</a></li>
    })


    return (
        <div className='nav-background'>
            <div className='leftGrid'>
                <img src={tubaLogo}></img>
                <h1 className='logo'>TUBA</h1>
            </div>
            <div className='centerGrid'>
                <ul>
                    {tabs}
                </ul>
            </div>
            <div>
                <ul>
                    <li className='rightGrid'><a>Connect</a></li>
                </ul>
            </div>
        </div>
    )


}