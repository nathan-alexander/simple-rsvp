import { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
function EditEvent({ event }) {
    const [eventData, setEventData] = useState(event)

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
        <div className='event-detail-container'>
            <div className='event-detail'>
                <div className='event-detail-name'>{event.name}</div>
                {event.description}
                <div className='event-details'>
                    <div className='event-location'>
                        <p className='underline'>Location</p>
                        <p className='event-location-address'>
                            {event.location.street}
                        </p>
                        <p className='event-location-address'>
                            {event.location.city} {event.location.state}{' '}
                            {event.location.zip}
                        </p>
                    </div>
                    <div className='event-time'>
                        <p>
                            Starts in{' '}
                            {formatDistanceToNow(new Date(event.startDate))}
                        </p>
                        <span>{readableDate(event.startDate)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEvent
