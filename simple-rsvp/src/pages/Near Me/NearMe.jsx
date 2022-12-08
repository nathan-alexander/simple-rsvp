//Start with 5 mile radius, refactor to add in additional options
import { useState, useEffect, useContext } from 'react'
import { EventContext } from '../../context/EventContext'
import Event from '../../shared/Event'
import useGeolocation from '../../hooks/useGeolocation'
import { getCoordinatesFromZIP } from '../../utils/geocoding'
import Loading from '../../shared/Loading'

function NearMe() {
    const [nearbyEvents, setNearbyEvents] = useState([])
    const [zip, setZip] = useState('')
    const [message, setMessage] = useState(null)
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
            setMessage('Events nearby')
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
        const isValidZip = /^\b\d{5}(-\d{4})?\b$/.test(zip)
        if (isValidZip) {
            let coordinates = await getCoordinatesFromZIP(zip)
            nearby(coordinates.lat, coordinates.lng, 5)
            setMessage(`Events near ${zip}`)
        } else {
            setMessage('Please enter a valid ZIP')
        }
    }

    if (nearbyEvents.length > 0) {
        eventElements = nearbyEvents.map((event) => {
            return <Event key={event._id} event={event} />
        })
    }
    if (location.loaded && !location.error) {
        return (
            <div>
                {message && <h1>{message}</h1>}
                {eventElements}
            </div>
        )
    } else if (location.loaded && location.error) {
        return (
            <div>
                <div className='near-me-zip'>
                    <h3>Enter ZIP</h3>
                    {message && <p>{message}</p>}
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
        return <Loading />
    }
}

export default NearMe
