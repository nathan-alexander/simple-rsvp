//Request user location or have the user input a ZIP
//On ZIP submission or user location obtain, get the Lat/Lon of the location
//Start with 5 mile radius, refactor to add in additional options
//Calculate all latlon within 5 miles of the user given location? (There may be a better way here)
//Query database to return events within the given radius, transform into an object that also holds the distance away for filtering

//Need to refactor CreateEvent to query Google Maps to store the Lat/Lon of the event and store those details in the Event Model.

import { useState, useEffect, useContext } from 'react'
import { EventContext } from '../../context/EventContext'
import Event from '../../shared/Event'
import useGeolocation from '../../hooks/useGeolocation'
import { getCoordinatesFromZIP } from '../../utils/geocoding'

function NearMe() {
    const [nearbyEvents, setNearbyEvents] = useState([])
    const [zip, setZip] = useState('')
    const { getEventsNearby } = useContext(EventContext)
    const location = useGeolocation()
    let eventElements
    useEffect(() => {
        if (location.loaded && !location.error) {
            nearby(
                location.coordinates.latitude,
                location.coordinates.longitude,
                5
            )
        }
    }, [location])

    async function nearby(lat, lon, radius) {
        const nearby = await getEventsNearby(lat, lon, radius)
        setNearbyEvents(nearby)
    }

    function handleChange(e) {
        setZip(e.target.value)
    }

    async function submitZip(e) {
        e.preventDefault()
        let coordinates = await getCoordinatesFromZIP(zip)
        nearby(coordinates.lat, coordinates.lng, 5)
    }

    if (nearbyEvents.length > 0) {
        eventElements = nearbyEvents.map((event) => {
            return <Event key={event._id} event={event} />
        })
    }
    if (location.loaded && !location.error) {
        return <div>{eventElements}</div>
    } else if (location.loaded && location.error) {
        return (
            <div>
                <div className='near-me-zip'>
                    <h3>Enter ZIP</h3>
                    <form onSubmit={submitZip}>
                        <input
                            type='text'
                            name='zip'
                            value={zip}
                            onChange={handleChange}
                        />
                        <button type='submit'>Go</button>
                    </form>
                </div>
                {eventElements && eventElements}
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default NearMe
