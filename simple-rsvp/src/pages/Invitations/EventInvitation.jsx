import { useState, useContext, useEffect } from 'react'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
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

    function decisionMessage() {
        if (userDecision === 'Attending') {
            return <p>You are attending this event</p>
        } else if (userDecision === 'Declined') {
            return <p>You declined this event</p>
        } else {
            return <p>Please make a decision</p>
        }
    }
    return (
        <div className='event-invitation'>
            <h3>{props.event.name}</h3>
            {decisionMessage()}
            {userDecision !== 'Attending' && (
                <div onClick={handleAccept}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        size='2x'
                        className='accept-icon'
                    />
                </div>
            )}
            {userDecision !== 'Declined' && (
                <div onClick={handleDecline}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        size='2x'
                        className='decline-icon'
                    />
                </div>
            )}
        </div>
    )
}

export default EventInvitation
