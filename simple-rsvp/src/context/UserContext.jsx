import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

function UserContextProvider({ children }) {
    const [user, setUser] = useState()
    const [message, setMessage] = useState(null)
    const [eventsHosting, setEventsHosting] = useState([])
    const [eventsAttending, setEventsAttending] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const url = 'http://localhost:5001/api'

    async function getEventsHostedByUser(id) {
        const res = await fetch(`${url}/users/${id}/events`)
        const data = await res.json()
        setEventsHosting(data)
    }
    async function loginUser(user) {
        const res = await fetch(`${url}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })

        const data = await res.json()

        if (data.token) {
            setUser(data)
            localStorage.setItem('user', JSON.stringify(data))
            setMessage(null)
        } else {
            setMessage('Could not login')
        }
    }
    async function logoutUser() {
        setUser(null)
        localStorage.removeItem('user')
    }
    async function signupUser(user) {
        const res = await fetch(`${url}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        const data = await res.json()
        if (data.token) {
            setUser(data)
            localStorage.setItem('user', JSON.stringify(data))
        } else {
            setMessage('Could not sign up')
        }
    }

    async function updateUser(user) {
        const res = await fetch(`${url}/users/${user._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user._id,
                profileImageUrl: user.profileImageUrl,
            }),
        })
        const data = await res.json()
        setUser(data)
    }

    async function getUserById(id) {
        const res = await fetch(`${url}/users/${id}`)
        const data = await res.json()
        return data
    }

    async function getUserByEmail(email) {
        const res = await fetch(`${url}/users/email/${email}`)
        const data = await res.json()
        return data
    }

    async function getEventsInvitedTo(id) {
        const res = await fetch(`${url}/users/${id}/invitations`)
        const data = await res.json()
        return data
    }

    //acceptEventInvitation, declineEventInvitation
    async function acceptEventInvitation(id, eventId) {
        const res = await fetch(`${url}/users/${id}/events/${eventId}/accept`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
    }

    async function declineEventInvitation(id, eventId) {
        const res = await fetch(
            `${url}/users/${id}/events/${eventId}/decline`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        const data = await res.json()
    }
    return (
        <UserContext.Provider
            value={{
                user,
                message,
                setUser,
                eventsHosting,
                eventsAttending,
                getEventsHostedByUser,
                signupUser,
                loginUser,
                logoutUser,
                getUserById,
                getUserByEmail,
                getEventsInvitedTo,
                acceptEventInvitation,
                declineEventInvitation,
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }

//Retrieve user information
//Retrieve related event information
