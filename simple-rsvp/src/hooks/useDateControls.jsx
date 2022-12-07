import { useState, useEffect } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
function useDateControls(event) {
    const [eventExpired, setEventExpired] = useState(false)

    useEffect(() => {
        setEventExpired(new Date(event.endDate) < new Date())
    }, [event])

    const dateStyles = {
        color: eventExpired ? 'red' : 'black',
    }

    function displayDistanceToNow() {
        if (
            new Date(event.startDate) < new Date() &&
            new Date(event.endDate) > new Date()
        ) {
            return 'Event Started'
        } else if (new Date(event.endDate) < new Date()) {
            return 'Expired'
        } else {
            return `Starts in ${formatDistanceToNow(new Date(event.startDate))}`
        }
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

    return [eventExpired, displayDistanceToNow, readableDate, dateStyles]
}

export default useDateControls
