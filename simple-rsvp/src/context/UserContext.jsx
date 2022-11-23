import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

function UserContextProvider({ children }) {
    const [user, setUser] = useState()
    const [eventsHosting, setEventsHosting] = useState([])
    const [eventsAttending, setEventsAttending] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const url = 'http://localhost:3000'

    async function getEventsHostedByUser(id) {
        const res = await fetch(`${url}/users/${id}/events`)
        const data = await res.json()
        setEventsHosting(data)
    }
    async function loginUser(user) {
        const res = await fetch(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        const data = await res.json()
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
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
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                eventsHosting,
                eventsAttending,
                getEventsHostedByUser,
                signupUser,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }

//Retrieve user information
//Retrieve related event information
