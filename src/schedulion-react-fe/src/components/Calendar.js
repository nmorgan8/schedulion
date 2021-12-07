import React, {useState} from 'react'
import Header from './calendar/Header'
import Body from './calendar/Body'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import './Calendar.css'

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    function nextMonth() {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    function prevMonth() {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    function onDateClick(day) {
        setSelectedDate(day)
    }

    return (
        <div>
            <Header 
                currentMonth = {currentMonth}
                nextMonth = {nextMonth}
                prevMonth = {prevMonth}
            />
            <Body
                currentMonth = {currentMonth}
                selectedDate = {selectedDate}
                onDateClick = {onDateClick}
            />
        </div>
    )
}

export default Calendar
