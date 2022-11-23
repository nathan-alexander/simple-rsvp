import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'
function CreateEvent() {
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        public: true,
    })
    const { createEvent } = useContext(EventContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    function handleOnChange(e) {
        setNewEvent((prevState) => ({
            ...prevState,
            [e.target.name]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        }))
    }

    function handleSubmit(e) {
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
            public: newEvent.public,
            userId: user.user.id,
        }
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

                <button className='btn btn-primary reduced-width' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateEvent
