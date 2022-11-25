import { useState, useContext } from 'react'
import { EventContext } from '../../context/EventContext'
import { UserContext } from '../../context/UserContext'

function InviteUserForm(props) {
    const [formData, setFormData] = useState({
        email: '',
    })

    const { inviteUserToEvent } = useContext(EventContext)
    const { getUserByEmail } = useContext(UserContext)

    function handleOnChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const user = await getUserByEmail(formData.email)
        inviteUserToEvent(props.eventId, user._id)
    }
    return (
        <form>
            <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleOnChange}
            />
            <button type='submit' onClick={handleSubmit}>
                Invite
            </button>
        </form>
    )
}

export default InviteUserForm
