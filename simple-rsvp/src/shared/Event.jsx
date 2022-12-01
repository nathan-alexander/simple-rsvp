import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
function Event({ event }) {
    const [eventOwner, setEventOwner] = useState(null)
    const publicText = event.public ? 'Public' : 'Private'

    const styles = {
        backgroundColor: event.public ? 'lightgreen' : 'orange',
        color: 'white',
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
                return `${eventOwner.name}'s event`
            }
        } else if (eventOwner) {
            return `${eventOwner.name}'s event`
        }
    }
    return (
        <Link to={`event/${event._id}`}>
            <div className='event'>
                <div className='event-header'>
                    <div className='event-host'>{displayEventOwner()}</div>
                    <div style={styles} className='public-text'>
                        {publicText}
                    </div>
                </div>
                <div className='event-details'>
                    <div className='event-name'>{event.name}</div>
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
