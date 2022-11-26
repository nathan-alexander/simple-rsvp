import { useState, useContext, useEffect } from 'react'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'

function EventInvitation(props) {
    const [userDecision, setUserDecision] = useState()
    //const { getEventById } = useContext(EventContext)
    const { user, acceptEventInvitation, declineEventInvitation } =
        useContext(UserContext)
    useEffect(() => {
        // const userIsAttending = props.event.usersAttending.includes(user._id)
        // console.log(userIsAttending)
        // if (userIsAttending) {
        //     setUserDecision('Attending')
        // } else {

        // }
        props.event.usersAttending.includes(user._id)
            ? setUserDecision('Attending')
            : props.event.usersDeclined.includes(user._id)
            ? setUserDecision('Declined')
            : setUserDecision('None')
    }, [])
    function handleAccept(e) {
        e.preventDefault()
        acceptEventInvitation(user._id, props.event._id)
        setUserDecision('Attending')
    }

    function handleDecline(e) {
        e.preventDefault()
        declineEventInvitation(user._id, props.event._id)
        setUserDecision('Declined')
    }
    return (
        <div className='event-invitation'>
            {props.event.name}
            {userDecision !== 'Attending' && (
                <button onClick={handleAccept}>Accept Invitation</button>
            )}
            {userDecision !== 'Declined' && (
                <button onClick={handleDecline}>Decline Invitation</button>
            )}
        </div>
    )
}

export default EventInvitation
