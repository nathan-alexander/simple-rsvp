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
                <>
                    <div className='user-message'>
                        <h2>Welcome {user.name}</h2>
                    </div>
                    <div className='user-events'>
                        {eventsHosting.length > 0 ? (
                            <div>
                                <h3>Events Hosting</h3>
                                {hostedEventElements && hostedEventElements}
                            </div>
                        ) : (
                            <div>
                                <h5>You aren't hosting any events</h5>
                            </div>
                        )}
                    </div>
                </>
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
                {events.length > 0 ? (
                    <div>
                        <h3>All Events</h3>
                        {eventElements && eventElements}
                    </div>
                ) : (
                    <h5>We couldn't find any events</h5>
                )}
            </div>
        </div>
    )
}

export default Home
