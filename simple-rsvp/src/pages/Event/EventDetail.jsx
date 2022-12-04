import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import InviteUserForm from './InviteUserForm'
import EventOptions from '../../shared/EventOptions'
import InvitedUser from './InvitedUser'
function EventDetail() {
    const [event, setEvent] = useState()
    const [userIsOwner, setUserIsOwner] = useState(false)
    const [invited, setInvited] = useState([])
    const [attendees, setAttendees] = useState([])
    const { id } = useParams()
    const {
        getEventById,
        deleteEvent,
        getInvitedUsers,
        getAttendingUsers,
        uninviteUserFromEvent,
        inviteUserToEvent,
    } = useContext(EventContext)
    const { user, getUserByEmail } = useContext(UserContext)
    const navigate = useNavigate()

    let invitedUsersElements

    useEffect(() => {
        async function getEvent() {
            const data = await getEventById(id)
            setEvent(data)
            const invitedUsers = await getInvitedUsers(data._id)
            setInvited(invitedUsers.usersInvited)
            const attendingUsers = await getAttendingUsers(data._id)
            setAttendees(attendingUsers.usersAttending)
        }
        getEvent()
    }, [])

    useEffect(() => {
        if (user && event) {
            setUserIsOwner(user._id === event.userId)
        }
    }, [event])

    function handleDelete(id) {
        deleteEvent(id)
        navigate('/')
    }

    async function handleUninvite(eventId, userId) {
        await uninviteUserFromEvent(eventId, userId)
        const invitedUsers = await getInvitedUsers(event._id)
        setInvited(invitedUsers.usersInvited)
    }

    async function inviteUser(email) {
        const user = await getUserByEmail(email)
        await inviteUserToEvent(event._id, user._id)
        const invitedUsers = await getInvitedUsers(event._id)
        setInvited(invitedUsers.usersInvited)
    }

    async function updateAttendees() {
        const attendingUsers = await getAttendingUsers(event._id)
        setAttendees(attendingUsers.usersAttending)
    }

    if (invited.length > 0) {
        invitedUsersElements = invited.map((user) => {
            return (
                <InvitedUser
                    key={user._id}
                    userIsOwner={userIsOwner}
                    user={user}
                    handleUninvite={handleUninvite}
                    event={event}
                    attendees={attendees}
                />
            )
        })
    }

    return (
        <div className='event-detail-container'>
            {event ? (
                <div className='event-detail'>
                    <div className='event-detail-name'>{event.name}</div>
                    <div className='event-details'>
                        {event.description}
                        <div className='event-location'>
                            <p className='underline'>Location</p>
                            <p className='event-location-address'>
                                {event.location.street}
                            </p>
                            <p className='event-location-address'>
                                {event.location.city} {event.location.state}{' '}
                                {event.location.zip}
                            </p>
                        </div>
                        <div className='invited-users'>
                            <p className='invited-label underline'>Invited</p>
                            {invitedUsersElements}
                        </div>
                    </div>
                    {event.public && !userIsOwner && (
                        <EventOptions
                            user={user}
                            event={event}
                            updateAttendees={updateAttendees}
                        />
                    )}
                    {userIsOwner ? (
                        <div className='event-controls'>
                            <InviteUserForm
                                eventId={event._id}
                                inviteUser={inviteUser}
                            />
                            <button className='btn btn-edit'>Edit</button>
                            <button
                                className='btn btn-delete'
                                onClick={() => handleDelete(event._id)}
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
