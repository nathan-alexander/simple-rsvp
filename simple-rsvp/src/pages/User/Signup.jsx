import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'
function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        name: '',
    })
    const { signupUser, message, user } = useContext(UserContext)
    function handleSubmit(e) {
        e.preventDefault()
        signupUser(formData)
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    if (!user) {
        return (
            <div>
                <h1>Signup</h1>
                {message && <p>{message}</p>}
                <form className='signup-form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        value={formData.name}
                        name='name'
                        onChange={handleChange}
                        className='text-input'
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        value={formData.username}
                        name='username'
                        onChange={handleChange}
                        className='text-input'
                    />
                    <input
                        type='text'
                        placeholder='Email'
                        value={formData.email}
                        name='email'
                        onChange={handleChange}
                        className='text-input'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        name='password'
                        onChange={handleChange}
                        className='text-input'
                    />
                    <button
                        className='btn btn-primary reduced-width'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    } else {
        return <Navigate to='/' replace />
    }
}

export default Signup
