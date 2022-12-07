import { useState, useContext, useEffect } from 'react'
import EventOptions from '../../shared/EventOptions'
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function EventInvitation(props) {
    const [eventExpired, setEventExpired] = useState(
        new Date(props.event.endDate) < new Date()
    )

    const dateStyles = {
        color: eventExpired ? 'red' : 'black',
    }

    function displayDistanceToNow() {
        if (
            new Date(props.event.startDate) < new Date() &&
            new Date(props.event.endDate) > new Date()
        ) {
            return 'Event Started'
        } else if (new Date(props.event.endDate) < new Date()) {
            return 'Expired'
        } else {
            return `Starts in ${formatDistanceToNow(
                new Date(props.event.startDate)
            )}`
        }
    }

    function readableDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }
    return (
        <div className='event-invitation'>
            <div>
                <h3>
                    <Link to={`/event/${props.event._id}`}>
                        {props.event.name}
                    </Link>
                </h3>
                <div style={dateStyles}>{displayDistanceToNow()}</div>
                <div className='event-time'>
                    <span>
                        {readableDate(props.event.startDate)} -{' '}
                        {readableDate(props.event.endDate)}
                    </span>
                </div>
            </div>
            {!eventExpired ? <EventOptions event={props.event} /> : <></>}
        </div>
    )
}

export default EventInvitation
