import { Link } from 'react-router-dom'

function Event({ event }) {
    const publicText = event.public ? 'Public' : 'Private'

    const styles = {
        color: event.public ? 'darkgreen' : 'orange',
    }
    return (
        <Link to={`event/${event.id}`}>
            <div className='event'>
                <div className='event-header'>
                    <div>{event.name}</div>
                    <div style={styles} className='public-text'>
                        {publicText}
                    </div>
                </div>
                <div className='event-details'>
                    <div className='event-description'>{event.description}</div>
                    <div className='event-host'></div>
                    <div className='event-location'>
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
