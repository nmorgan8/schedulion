import React from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addDays, isSameMonth, isSameDay, parse } from 'date-fns'


function Days(props) {
    const dateFormat = "dddd"
    const days = []

    const startDate = startOfWeek(props.currentMonth)


    for (let i = 0; i < 7; i++) {
        days.push(
          <div className="col col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
        );
      }
  
      return <div className="days row">{days}</div>
}

function Cells(props) {
  const monthStart = startOfMonth(props.currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(props.currentMonth)
  const endDate = endOfWeek(monthEnd)

  const dateFormat = "d";
  const rows = []

  let days = []
  let day = startDate
  let formattedDate = ""

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat)
      console.log(formattedDate)
      const cloneDay = day
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
            ? "disabled"
            : isSameDay(day, props.selectedDate) ? "selected" : ""
          }`}
          key = {day}
          onClick={() => props.onDateClick(parse(cloneDay))}
        >
          <span className="number">{formattedDate}</span>
        </div>
      )

      day = addDays(day, 1)

    }

    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }


  return(        
    <div>{rows}</div>
  )
}

export default function Body(props) {
  return (
    <div>
      <Days 
        currentMonth = {props.currentMonth}
      />
      <Cells 
        currentMonth = {props.currentMonth}
        selectedDate = {props.selectedDate}
        onDateClick = {props.onDateClick}
      />
    </div>
  )
}
