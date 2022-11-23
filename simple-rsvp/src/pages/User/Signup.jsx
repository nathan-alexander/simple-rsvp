import { useState } from 'react'

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        name: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
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
                <button className='btn btn-primary reduced-width' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Signup
