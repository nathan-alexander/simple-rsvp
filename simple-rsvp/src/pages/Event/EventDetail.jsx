import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import InviteUserForm from './InviteUserForm'
import EventOptions from '../../shared/EventOptions'
import InvitedUser from './InvitedUser'
import DeleteModal from '../../shared/DeleteModal'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function EventDetail() {
    const [event, setEvent] = useState()
    const [userIsOwner, setUserIsOwner] = useState(false)
    const [invited, setInvited] = useState([])
    const [attendees, setAttendees] = useState([])
    const [editing, setEditing] = useState(false)
    const [eventExpired, setEventExpired] = useState(false)
    const [modalShow, setModalShow] = useState(false)

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
    let attendingUserElements
    let dateStyles

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

    async function handleDelete() {
        console.log('Deleting event')
        await deleteEvent(event._id)
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

    function handleAddressChange(e) {
        setEvent((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                [e.target.name]: e.target.value,
            },
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
        const attendingUsers = await getAttendingUsers(event._id)
        setAttendees(attendingUsers.usersAttending)
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

    function formatDate(dateStr) {
        const date = new Date(dateStr)
        const offsetMs = date.getTimezoneOffset() * 60 * 1000
        const dateLocal = new Date(date.getTime() - offsetMs)
        const str = dateLocal.toISOString().slice(0, 16).replace(/-/g, '-')
        return str
    }
    if (event) {
        dateStyles = {
            color: eventExpired ? 'red' : 'black',
        }
    }

    function displayDistanceToNow() {
        if (event) {
            if (
                new Date(event.startDate) < new Date() &&
                new Date(event.endDate) > new Date()
            ) {
                return 'Event Started'
            } else if (new Date(event.endDate) < new Date()) {
                return 'Expired'
            } else {
                return `Starts in ${formatDistanceToNow(
                    new Date(event.startDate)
                )}`
            }
        }
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
    if (attendees.length > 0) {
        //only show attendees that were not previously invited
        if (invited) {
            const invitedIds = new Set(invited.map(({ _id }) => _id))
            const filteredAttendees = attendees.filter(
                ({ _id }) => !invitedIds.has(_id)
            )
            attendingUserElements = filteredAttendees.map((user) => {
                return (
                    <InvitedUser
                        key={user._id}
                        userIsOwner={userIsOwner}
                        user={user}
                        handleUninvite={handleUninvite}
                        event={event}
                        attendees={attendees}
                        publicUser={true}
                    />
                )
            })
        } else {
            attendingUserElements = attendees.map((user) => {
                return (
                    <InvitedUser
                        key={user._id}
                        userIsOwner={userIsOwner}
                        user={user}
                        handleUninvite={handleUninvite}
                        event={event}
                        attendees={attendees}
                        publicUser={true}
                    />
                )
            })
        }
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
                                size={event.name.length + 2}
                                value={event.name}
                                className='inherit text-input-skinny'
                            ></input>
                        ) : (
                            <span>{event.name}</span>
                        )}
                    </div>
                    {editing ? (
                        <textarea
                            name='description'
                            onChange={handleOnChange}
                            value={event.description}
                            className='inherit text-input-skinny'
                        ></textarea>
                    ) : (
                        <span>{event.description}</span>
                    )}

                    <div className='event-details'>
                        <div className='event-location'>
                            <p className='underline event-location-address'>
                                Location
                            </p>
                            {editing ? (
                                <>
                                    <p className='event-location-address'>
                                        <input
                                            name='street'
                                            placeholder='Street Address'
                                            onChange={handleAddressChange}
                                            value={event.location.street}
                                            className='inherit text-input-skinny'
                                        ></input>
                                    </p>
                                    <p className='event-location-address'>
                                        <input
                                            name='city'
                                            placeholder='City'
                                            onChange={handleAddressChange}
                                            value={event.location.city}
                                            size={
                                                event.location.city.length + 2
                                            }
                                            className='inherit text-input-skinny'
                                        ></input>
                                        <input
                                            name='state'
                                            placeholder='State'
                                            onChange={handleAddressChange}
                                            value={event.location.state}
                                            size={
                                                event.location.state.length + 2
                                            }
                                            className='inherit text-input-skinny'
                                        ></input>
                                        <input
                                            name='zip'
                                            placeholder='ZIP'
                                            maxLength='5'
                                            size='5'
                                            onChange={handleAddressChange}
                                            value={event.location.zip}
                                            className='inherit text-input-skinny'
                                        ></input>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className='event-location-address'>
                                        {event.location.street}
                                    </p>
                                    <p className='event-location-address'>
                                        {event.location.city}{' '}
                                        {event.location.state}{' '}
                                        {event.location.zip}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className='event-time'>
                            {editing ? (
                                <>
                                    <input
                                        type='datetime-local'
                                        value={formatDate(event.startDate)}
                                        onChange={handleOnChange}
                                        name='startDate'
                                        className='inherit text-input-skinny'
                                    />
                                    <input
                                        type='datetime-local'
                                        value={formatDate(event.endDate)}
                                        onChange={handleOnChange}
                                        name='endDate'
                                        className='inherit text-input-skinny'
                                    />
                                </>
                            ) : (
                                <>
                                    <p style={dateStyles}>
                                        {displayDistanceToNow()}
                                    </p>
                                    <span>
                                        {readableDate(event.startDate)} -{' '}
                                        {readableDate(event.endDate)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='invited-users'>
                        <p className='invited-label underline'>Invited</p>
                        {invitedUsersElements}
                        {attendingUserElements}
                    </div>
                    {event.public && !userIsOwner && !eventExpired && (
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
                            <div className='owner-controls'>
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
                                    onClick={() => setModalShow(true)}
                                >
                                    Delete
                                </button>
                                <DeleteModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    item={event.name}
                                    handleDelete={handleDelete}
                                />
                            </div>
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
