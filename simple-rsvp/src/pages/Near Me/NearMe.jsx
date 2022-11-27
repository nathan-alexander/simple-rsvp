//Request user location or have the user input a ZIP
//On ZIP submission or user location obtain, get the Lat/Lon of the location
//Start with 5 mile radius, refactor to add in additional options
//Calculate all latlon within 5 miles of the user given location? (There may be a better way here)
//Query database to return events within the given radius, transform into an object that also holds the distance away for filtering

//Need to refactor CreateEvent to query Google Maps to store the Lat/Lon of the event and store those details in the Event Model.

import { useState, useEffect, useContext } from 'react'
import { EventContext } from '../../context/EventContext'
function NearMe() {
    const [userLocation, setUserLocation] = useState({
        latitude: '',
        longitude: '',
    })
    const [nearbyEvents, setNearbyEvents] = useState([])
    const [message, setMessage] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    //Going to need to create a method to get all events based on lat lon
    const { getEventsNearby } = useContext(EventContext)

    useEffect(() => {
        //Probably refactor into a util
        //May need to have a return function on this to stop infinite re render
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                    nearby(
                        position.coords.latitude,
                        position.coords.longitude,
                        5
                    )
                    setIsLoading(false)
                }
            })
        } else {
            setMessage('Geolocation not enabled, please enter your ZIP code')
            setIsLoading(false)
        }
    }, [])
    async function nearby(lat, lon, radius) {
        const nearby = await getEventsNearby(lat, lon, radius)
        setNearbyEvents(nearby)
    }
    if (!isLoading) {
        return <div>{message && <p>{message}</p>}</div>
    } else {
        return <div>Loading...</div>
    }
}

export default NearMe
