import EventOptions from '../../shared/EventOptions'
import { Link } from 'react-router-dom'
import useDateControls from '../../hooks/useDateControls'
function EventInvitation(props) {
    const [eventExpired, displayDistanceToNow, readableDate, dateStyles] =
        useDateControls(props.event)
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
