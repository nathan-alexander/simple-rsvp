import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
function EventDetail() {
    const [event, setEvent] = useState()
    const [userIsOwner, setUserIsOwner] = useState(false)
    const { id } = useParams()
    const { getEventById, deleteEvent } = useContext(EventContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        //This is going to be a more complex event type with more detail.
        //Will have to poll a map api to get lat,lon and display a map.
        //Potentially add the ability to show directions
        //Will also need to show attendees
        async function getEvent() {
            const data = await getEventById(id)
            setEvent(data)
        }
        getEvent()
    }, [])

    useEffect(() => {
        if (user && event) {
            setUserIsOwner(user.user.id === event.userId)
        }
    }, [event])

    function handleDelete(id) {
        deleteEvent(id)
        navigate('/')
    }

    return (
        <div className='event-detail-container'>
            {event ? (
                <div className='event-detail'>
                    <div className='event-detail-header'>{event.name}</div>
                    <div className='event-details'>
                        <div className='event-description'>
                            {event.description}
                        </div>
                        <div className='event-host'></div>
                    </div>
                    {userIsOwner ? (
                        <div className='event-controls'>
                            <button className='btn btn-edit'>Edit</button>
                            <button
                                className='btn btn-delete'
                                onClick={() => handleDelete(event.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    )
}

export default EventDetail
