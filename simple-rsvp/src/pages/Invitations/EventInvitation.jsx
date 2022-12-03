import { useState, useContext, useEffect } from 'react'
import EventOptions from '../../shared/EventOptions'
import { UserContext } from '../../context/UserContext'

function EventInvitation(props) {
    const { user } = useContext(UserContext)
    return (
        <div className='event-invitation'>
            <h3>{props.event.name}</h3>
            <EventOptions event={props.event} />
        </div>
    )
}

export default EventInvitation
