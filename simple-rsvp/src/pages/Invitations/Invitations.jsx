import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import EventInvitation from './EventInvitation'

function Invitations() {
    const { user, getEventsInvitedTo } = useContext(UserContext)
    const [eventsInvitedTo, setEventsInvitedTo] = useState([])
    let eventElements
    useEffect(() => {
        async function getEvents() {
            if (user) {
                const events = await getEventsInvitedTo(user._id)
                setEventsInvitedTo(events.eventsInvited)
            }
        }

        getEvents()
    }, [user])

    if (eventsInvitedTo.length > 0) {
        eventElements = eventsInvitedTo.map((event) => {
            return <EventInvitation key={event._id} event={event} />
        })
    }
    return <div>{eventElements}</div>
}

export default Invitations
