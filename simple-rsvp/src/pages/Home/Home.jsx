import { useContext, useEffect } from 'react'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import Event from '../../shared/Event'
import { NavLink } from 'react-router-dom'

function Home() {
    const { events } = useContext(EventContext)
    const { user, eventsHosting, getEventsHostedByUser } =
        useContext(UserContext)
    let hostedEventElements, eventElements

    if (user && eventsHosting) {
        hostedEventElements = eventsHosting.map((event) => {
            return <Event key={event._id} event={event} />
        })
        eventElements = events
            .filter((event) => event.userId !== user._id)
            .map((event) => {
                return <Event key={event._id} event={event} />
            })
    } else {
        eventElements = events.map((event) => {
            return <Event key={event._id} event={event} />
        })
    }

    useEffect(() => {
        if (user) {
            getEventsHostedByUser(user._id)
        }
    }, [user, events])
    return (
        <div className='home'>
            {user ? (
                <div className='user-message'>
                    <h2>Welcome {user.name}</h2>
                    {hostedEventElements && (
                        <div>
                            <h3>You are hosting</h3>
                            {hostedEventElements}
                        </div>
                    )}
                </div>
            ) : (
                <h4>
                    Please{' '}
                    <NavLink to='/login' className='link'>
                        login
                    </NavLink>{' '}
                    to view your events
                </h4>
            )}
            <div className='all-events'>
                <h3>All Events</h3>
                {eventElements && eventElements}
            </div>
        </div>
    )
}

export default Home
