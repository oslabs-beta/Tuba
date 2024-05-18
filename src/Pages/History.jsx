import React from 'react';
import HistoryContainer from '../Components/History/HistoryContainer'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '../Redux/historySlice';
import { msToString } from '../Utilities/timeFunctions';

export default function History() {

    const dispatch = useDispatch()
    const allErrors = useSelector(state => state.errorSlice.allErrors)
    const search = useSelector(state => state.history.search)
    const inputText = (event) => {
        dispatch(setSearch(event.target.value))
    }

    const errorsFiltered = allErrors.filter((err) => {
        return err.err_stack.toLowerCase().includes(search.toLowerCase()) || msToString(Number(err.err_time)).date.includes(search) || msToString(Number(err.err_time)).time.includes(search)
    }).reverse()

    const errors = errorsFiltered.map(error => {
        return <HistoryContainer info={error} />
    })

    return (
        <div className='component'>
            <div className='historyList'>
                <div className='filterContainer'>
                    <div className='filterSection'>
                        <h3>Filter</h3>
                        <input onInput={inputText} value={search}></input>
                    </div>
                </div>
                <div className='historyColumns'>
                    <p >Date</p>
                    <p >Time</p>
                    <p >Type</p>
                    <p >Service</p>
                    <p >Pin</p>
                </div>
                {errors}
            </div>
        </div>
    )
}