import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        name: '',
        password2: '',
    })

    const { signupUser, message, user } = useContext(UserContext)
    async function handleSubmit(e) {
        e.preventDefault()
        if (formData.password !== formData.password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                username: formData.username,
            }

            const signedUp = await signupUser(userData)
            if (!signedUp) {
                toast.error(message)
            }
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (!user) {
        return (
            <div>
                <h1>Signup</h1>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        value={formData.name}
                        name='name'
                        onChange={handleChange}
                        className='text-input'
                        required
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        value={formData.username}
                        name='username'
                        onChange={handleChange}
                        className='text-input'
                        required
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={formData.email}
                        name='email'
                        onChange={handleChange}
                        className='text-input'
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        name='password'
                        onChange={handleChange}
                        className='text-input'
                        required
                    />
                    <input
                        type='password'
                        placeholder='Confirm password'
                        value={formData.password2}
                        name='password2'
                        onChange={handleChange}
                        className='text-input'
                        required
                    />
                    <button
                        className='btn btn-primary reduced-width'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
                <ToastContainer />
            </div>
        )
    } else {
        return <Navigate to='/profile' replace />
    }
}

export default Signup
