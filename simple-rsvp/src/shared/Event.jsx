import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function Event({ event }) {
    const [eventOwner, setEventOwner] = useState(null)
    const publicText = event.public ? 'Public' : 'Private'

    const styles = {
        backgroundColor: event.public ? '#00cc66' : '#f75c03',
        color: 'white',
    }

    const dateStyles = {
        color: new Date(event.endDate) < new Date() ? 'red' : 'black',
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
                return 'Your Event'
            } else {
                return `${eventOwner.name}'s Event`
            }
        } else if (eventOwner) {
            return `${eventOwner.name}'s Event`
        }
    }

    function displayDistanceToNow() {
        if (
            new Date(event.startDate) < new Date() &&
            new Date(event.endDate) > new Date()
        ) {
            return 'Event Started'
        } else if (new Date(event.endDate) < new Date()) {
            return 'Expired'
        } else {
            return `Starts in ${formatDistanceToNow(new Date(event.startDate))}`
        }
    }

    return (
        <Link to={`event/${event._id}`} className='event-detail-link'>
            <div className='event'>
                <div className='event-header'>
                    <div className='event-host'>{displayEventOwner()}</div>

                    <div style={styles} className='public-text'>
                        {publicText}
                    </div>
                </div>
                <div>
                    <div className='event-details-header'>
                        <div className='event-name'>{event.name}</div>
                        <div style={dateStyles}>{displayDistanceToNow()}</div>
                    </div>
                    <div className='event-description'>{event.description}</div>

                    <div className='event-location'>
                        {event.distance && (
                            <p>
                                {Math.round(event.distance * 10) / 10} miles
                                away
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Event
