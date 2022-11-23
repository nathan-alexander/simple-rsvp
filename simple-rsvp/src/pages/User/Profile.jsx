import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'
function Profile() {
    const { user, logoutUser } = useContext(UserContext)
    function handleLogout() {
        logoutUser()
    }
    if (user) {
        return (
            <div>
                <h1>Hello {user.name}</h1>
                <h3>Account Options</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    } else {
        // return redirect('/login')
        return <Navigate to='/' replace />
    }
}

export default Profile
