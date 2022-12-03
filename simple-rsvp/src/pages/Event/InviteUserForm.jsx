import { useState } from 'react'

function InviteUserForm(props) {
    const [formData, setFormData] = useState({
        email: '',
    })

    function handleOnChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                props.inviteUser(formData.email)
            }}
        >
            <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleOnChange}
            />
            <button type='submit'>Invite</button>
        </form>
    )
}

export default InviteUserForm
