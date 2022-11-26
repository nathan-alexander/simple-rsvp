import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate, NavLink } from 'react-router-dom'
function Login() {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '', // required
    })

    const { user, loginUser, message } = useContext(UserContext)
    function handleSubmit(e) {
        e.preventDefault()
        console.log('hello')
        loginUser(formData)
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    let activeClassName = 'underline'
    if (!user) {
        return (
            <div className='login-container'>
                <h1>Login</h1>
                <h5>
                    Don't have an account?{' '}
                    <NavLink to='/signup' className='link'>
                        Sign up{' '}
                    </NavLink>
                    instead
                </h5>
                {message && <p>{message}</p>}
                <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type='text'
                        placeholder='Email'
                        value={formData.email}
                        name='email'
                        onChange={(e) => handleChange(e)}
                        className='text-input'
                    ></input>
                    <input
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        name='password'
                        onChange={(e) => handleChange(e)}
                        className='text-input'
                    ></input>
                    <button
                        className='btn btn-primary reduced-width'
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        )
    } else {
        //Add a redirect to Profile
        //return redirect('/profile')
        return <Navigate to='/' replace />
    }
}

export default Login
