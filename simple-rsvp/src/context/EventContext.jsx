import { createContext, useState, useEffect } from 'react'
const URL = import.meta.env.VITE_URL
const EventContext = createContext()
//Update to include user information
function EventContextProvider({ children }) {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const url = URL || 'http://localhost:5001/api'
    useEffect(() => {
        getEvents()
    }, [])

    async function getEvents() {
        const res = await fetch(`${url}/events`)
        const data = await res.json()
        setEvents(data)
    }

    async function getEventById(id) {
        const res = await fetch(`${url}/events/${id}`)
        const data = await res.json()
        return data
    }

    async function getEventsNearby(lat, lon, radiusMiles) {
        const res = await fetch(
            `${url}/events/nearby/find?lat=${lat}&lon=${lon}&radius=${radiusMiles}`
        )
        const data = await res.json()
        return data
    }

    async function createEvent(event) {
        const res = await fetch(`${url}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
        const data = await res.json()
        setEvents((prevEvents) => {
            return [data, ...prevEvents]
        })
    }

    async function deleteEvent(id) {
        //check if user is owner of event before deleting
        const res = await fetch(`${url}/events/${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            const newEvents = events.filter((event) => event._id !== id)
            setEvents(newEvents)
        }
    }

    async function inviteUserToEvent(eventId, userId) {
        const res = await fetch(`${url}/events/invite/${eventId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        return data
    }

    async function uninviteUserFromEvent(eventId, userId) {
        const res = await fetch(`${url}/events/uninvite/${eventId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        return data
    }

    async function editEvent(event) {
        const res = await fetch(`${url}/events/${event._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
        const data = await res.json()
        return data
    }

    async function getInvitedUsers(id) {
        const res = await fetch(`${url}/events/${id}/invited`)
        const data = await res.json()
        return data
    }

    async function getAttendingUsers(id) {
        const res = await fetch(`${url}/events/${id}/attending`)
        const data = await res.json()
        return data
    }
    return (
        <EventContext.Provider
            value={{
                events,
                isLoading,
                createEvent,
                getEventById,
                deleteEvent,
                inviteUserToEvent,
                getInvitedUsers,
                getAttendingUsers,
                uninviteUserFromEvent,
                getEventsNearby,
                editEvent,
            }}
        >
            {children}
        </EventContext.Provider>
    )
}

export { EventContextProvider, EventContext }
