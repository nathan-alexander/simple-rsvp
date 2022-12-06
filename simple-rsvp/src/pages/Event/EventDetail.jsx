import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import InviteUserForm from './InviteUserForm'
import EventOptions from '../../shared/EventOptions'
import InvitedUser from './InvitedUser'
import EditEvent from './EditEvent'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function EventDetail() {
    const [event, setEvent] = useState()
    const [userIsOwner, setUserIsOwner] = useState(false)
    const [invited, setInvited] = useState([])
    const [attendees, setAttendees] = useState([])
    const [editing, setEditing] = useState(false)
    const { id } = useParams()
    const {
        getEventById,
        deleteEvent,
        getInvitedUsers,
        getAttendingUsers,
        uninviteUserFromEvent,
        inviteUserToEvent,
        editEvent,
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
            setEditing(false)
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

    function handleOnChange(e) {
        setEvent((prevState) => ({
            ...prevState,
            [e.target.name]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        }))
    }

    function handleEdit() {
        setEditing(true)
    }

    async function editSubmit() {
        await editEvent(event)
        setEditing(false)
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

    function readableDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
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
                    <div className='event-detail-name'>
                        {editing ? (
                            <input
                                name='name'
                                onChange={handleOnChange}
                                value={event.name}
                                className='inherit text-input-skinny'
                            ></input>
                        ) : (
                            <span>{event.name}</span>
                        )}
                    </div>
                    {editing ? (
                        <input
                            name='description'
                            onChange={handleOnChange}
                            value={event.description}
                            className='inherit text-input-skinny'
                        ></input>
                    ) : (
                        <span>{event.description}</span>
                    )}

                    <div className='event-details'>
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
                        <div className='event-time'>
                            <p>
                                Starts in{' '}
                                {formatDistanceToNow(new Date(event.startDate))}
                            </p>
                            <span>{readableDate(event.startDate)}</span>
                        </div>
                    </div>
                    <div className='invited-users'>
                        <p className='invited-label underline'>Invited</p>
                        {invitedUsersElements}
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
                            {!editing ? (
                                <button
                                    className='btn btn-edit'
                                    onClick={() => handleEdit()}
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    className='btn btn-edit'
                                    onClick={() => editSubmit()}
                                >
                                    Save
                                </button>
                            )}

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
