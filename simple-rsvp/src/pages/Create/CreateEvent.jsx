import { useState, useContext } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
import { getCoordinatesFromAddress } from '../../utils/geocoding'
import { useEffect } from 'react'
function CreateEvent() {
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        startDate: formatDate(),
        endDate: formatDate(),
        public: true,
    })
    const { createEvent } = useContext(EventContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    function formatDate() {
        const now = new Date()
        const offsetMs = now.getTimezoneOffset() * 60 * 1000
        const dateLocal = new Date(now.getTime() - offsetMs)
        const str = dateLocal.toISOString().slice(0, 16).replace(/-/g, '-')
        return str
    }
    function handleOnChange(e) {
        setNewEvent((prevState) => ({
            ...prevState,
            [e.target.name]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const eventObject = {
            name: newEvent.name,
            description: newEvent.description,
            location: {
                street: newEvent.street,
                city: newEvent.city,
                state: newEvent.state,
                zip: newEvent.zip,
            },
            latitude: '',
            longitude: '',
            startDate: newEvent.startDate,
            endDate: newEvent.endDate,
            public: newEvent.public,
            userId: user._id,
        }
        console.log(eventObject)
        let coordinates = await getCoordinatesFromAddress(eventObject.location)
        eventObject.latitude = coordinates.lat
        eventObject.longitude = coordinates.lng

        createEvent(eventObject)
        navigate('/')
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='event-creation-form'>
                <input
                    type='text'
                    placeholder='Event Name'
                    value={newEvent.name}
                    onChange={handleOnChange}
                    name='name'
                    className='text-input'
                />
                <input
                    type='text'
                    placeholder='Event Description'
                    value={newEvent.description}
                    onChange={handleOnChange}
                    name='description'
                    className='text-input'
                />
                <input
                    type='datetime-local'
                    placeholder='Start Date'
                    value={newEvent.startDate}
                    onChange={handleOnChange}
                    name='startDate'
                    className='text-input'
                />
                <input
                    type='datetime-local'
                    placeholder='End Date'
                    value={newEvent.endDate}
                    onChange={handleOnChange}
                    name='endDate'
                    className='text-input'
                />
                <input
                    type='text'
                    placeholder='Street'
                    value={newEvent.street}
                    onChange={handleOnChange}
                    name='street'
                    className='text-input'
                />
                <input
                    type='text'
                    placeholder='City'
                    value={newEvent.city}
                    onChange={handleOnChange}
                    name='city'
                    className='text-input'
                />
                <input
                    type='text'
                    placeholder='State'
                    value={newEvent.state}
                    onChange={handleOnChange}
                    name='state'
                    className='text-input'
                />
                <input
                    type='text'
                    placeholder='ZIP'
                    value={newEvent.zip}
                    onChange={handleOnChange}
                    name='zip'
                    className='text-input'
                />
                <div>
                    <input
                        id='public'
                        type='checkbox'
                        onChange={handleOnChange}
                        checked={newEvent.public}
                        value={newEvent.public}
                        name='public'
                    />
                    <label htmlFor='public'>Public event?</label>
                </div>
                <div className='centered'>
                    <button
                        className='btn btn-primary reduced-width'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent
