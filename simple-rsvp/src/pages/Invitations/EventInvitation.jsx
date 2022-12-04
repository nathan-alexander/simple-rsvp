import { useState, useContext, useEffect } from 'react'
import EventOptions from '../../shared/EventOptions'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import fortmatDistanceToNow from 'date-fns/formatDistanceToNow'

function EventInvitation(props) {
    const { user } = useContext(UserContext)
    return (
        <div className='event-invitation'>
            <div>
                <h3>
                    <Link to={`/event/${props.event._id}`}>
                        {props.event.name}
                    </Link>
                </h3>
                <div>
                    Starts in{' '}
                    {fortmatDistanceToNow(new Date(props.event.startDate))}
                </div>
            </div>
            <EventOptions event={props.event} />
        </div>
    )
}

export default EventInvitation
