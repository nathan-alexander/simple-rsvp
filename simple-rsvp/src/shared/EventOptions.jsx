import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'

function EventOptions(props) {
    const [userDecision, setUserDecision] = useState()
    const { user, acceptEventInvitation, declineEventInvitation } =
        useContext(UserContext)
    useEffect(() => {
        if (user) {
            props.event.usersAttending.includes(user._id)
                ? setUserDecision('Attending')
                : props.event.usersDeclined.includes(user._id)
                ? setUserDecision('Declined')
                : setUserDecision('None')
        }
    }, [user])

    function decisionMessage() {
        if (userDecision === 'Attending') {
            return <p>You are attending this event</p>
        } else if (userDecision === 'Declined') {
            return <p>You declined this event</p>
        } else {
            return <p>Please make a decision</p>
        }
    }

    async function handleAccept(e) {
        e.preventDefault()
        await acceptEventInvitation(user._id, props.event._id)
        setUserDecision('Attending')
        if (props.updateAttendees) {
            props.updateAttendees(props.event._id)
        }
    }

    async function handleDecline(e) {
        e.preventDefault()
        await declineEventInvitation(user._id, props.event._id)
        setUserDecision('Declined')
        if (props.updateAttendees) {
            props.updateAttendees(props.event._id)
        }
    }
    if (user) {
        return (
            <div className='event-options'>
                {decisionMessage()}
                {userDecision !== 'Attending' && (
                    <button className='btn btn-accept' onClick={handleAccept}>
                        Accept
                    </button>
                )}
                {userDecision !== 'Declined' && (
                    <button className='btn btn-decline' onClick={handleDecline}>
                        Decline
                    </button>
                )}
            </div>
        )
    } else {
        return <></>
    }
}

export default EventOptions
