import { useState, useContext } from 'react'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'

function EventInvitation(props) {
    const [userDecision, setUserDecision] = useState()
    const [eventId, setEventId] = useState()
    //const { getEventById } = useContext(EventContext)
    const { user, acceptEventInvitation, declineEventInvitation } =
        useContext(UserContext)

    function handleAccept(e) {
        e.preventDefault()
        acceptEventInvitation(user._id, props.event._id)
    }

    function handleDecline(e) {
        e.preventDefault()
        declineEventInvitation(user._id, props.event._id)
    }
    return (
        <div className='event-invitation'>
            {props.event.name}
            <button onClick={handleAccept}>Accept Invitation</button>
            <button onClick={handleDecline}>Decline Invitation</button>
        </div>
    )
}

export default EventInvitation
