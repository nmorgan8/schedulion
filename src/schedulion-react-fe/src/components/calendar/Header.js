import React from 'react'
import {format} from 'date-fns'

function header(props) {
    return (
    <div>
        <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={props.prevMonth}>
                    chevron_left
                </div>
            </div>
            <div className = "col col-center">
                <span>{format(props.currentMonth, "MMMM yyyy")}</span>
            </div>
            <div className="col col=end" onClick={props.nextMonth}>
                <div className="icon">
                    chevron_right
                </div>
            </div>
        </div>
    </div>
    )
}

export default header
