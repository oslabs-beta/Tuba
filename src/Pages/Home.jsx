import React from 'react'
import Nav from '../Components/Nav'
import Dashboard from './Dashboard'
import HeatMap from './HeatMap'
import History from './History'
import Timeline from './Timeline'
import Loading from './Loading'
import { changeTab } from '../Redux/navSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
    const errors = useSelector(state => state.errorSlice.allErrors)
    const dispatch = useDispatch();
    const { tab, left, right } = useSelector(state => state.nav);
    const frontend = useSelector(state => state.errorSlice.frontend);
    const displayCurrentTab = () => {
        if (tab === 'Dashboard') {
            return <Dashboard />
        } else if (tab === 'Timeline') {
            return <Timeline />
        } else if (tab === 'Heat Map') {
            return <HeatMap />
        } else if (tab === 'History') {
            return <History />
        }
    }

    const changeTabHandler = (string) => {
        dispatch(changeTab(string))
        return;
    }

    return (
        frontend ? <>
            <Nav />
            <div className='background' >
                {displayCurrentTab()}
            </div>
        </> : <Loading />
    )
}