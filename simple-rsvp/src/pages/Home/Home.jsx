import { useContext, useEffect } from 'react'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import Event from '../../shared/Event'
import { NavLink } from 'react-router-dom'

function Home() {
    const { events } = useContext(EventContext)
    const { user, eventsHosting, getEventsHostedByUser } =
        useContext(UserContext)

    const eventElements = events.map((event, index) => {
        return <Event key={event.id * index} event={event} />
    })
    let hostedEventElements
    if (eventsHosting) {
        hostedEventElements = eventsHosting.map((event, index) => {
            return <Event key={event.id * index} event={event} />
        })
    }
    useEffect(() => {
        if (user) {
            getEventsHostedByUser(user._id)
        }
    }, [user])
    return (
        <div className='home'>
            {user ? (
                <div className='user-message'>
                    <h2>Welcome {user.name}</h2>
                    {eventsHosting ? (
                        <div>
                            <h3>You are hosting</h3>
                            {hostedEventElements}
                        </div>
                    ) : (
                        <></>
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
                {eventElements}
            </div>
        </div>
    )
}

export default Home
