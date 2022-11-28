import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
function Event({ event }) {
    const [eventOwner, setEventOwner] = useState(null)
    const publicText = event.public ? 'Public' : 'Private'

    const styles = {
        color: event.public ? 'darkgreen' : 'orange',
    }

    const { user, getUserById } = useContext(UserContext)

    useEffect(() => {
        getEventOwner()
    }, [])

    async function getEventOwner() {
        const owner = await getUserById(event.userId)
        setEventOwner(owner)
    }

    function displayEventOwner() {
        if (user && eventOwner) {
            if (user._id === eventOwner._id) {
                return <p>My Event</p>
            } else {
                return <p>{eventOwner.name}'s event</p>
            }
        } else if (eventOwner) {
            return <p>{eventOwner.name}'s event </p>
        }
    }
    return (
        <Link to={`event/${event._id}`}>
            <div className='event'>
                <div className='event-header'>
                    <div>{event.name}</div>
                    <div style={styles} className='public-text'>
                        {publicText}
                    </div>
                </div>
                <div className='event-details'>
                    <div className='event-description'>{event.description}</div>
                    <div className='event-host'>{displayEventOwner()}</div>
                    <div className='event-location'>
                        {event.distance && (
                            <p>
                                {Math.round(event.distance * 10) / 10} miles
                                away
                            </p>
                        )}
                        <div className='event-address'>
                            {event.location.street}
                        </div>
                        <div className='event-subaddress'>
                            <p>{event.location.city}</p>
                            <p>{event.location.state}</p>
                            <p>{event.location.zip}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Event
