import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'
import UploadProfileImage from './UploadProfileImage'
function Profile() {
    const { user, logoutUser } = useContext(UserContext)
    function handleLogout() {
        logoutUser()
    }
    if (user) {
        return (
            <div className='profile-page'>
                <h1>Hello {user.name}</h1>
                <div className='profile-page-options'>
                    <h2>Account Options</h2>
                    <UploadProfileImage />
                    <h3>Logout</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        )
    } else {
        // return redirect('/login')
        return <Navigate to='/' replace />
    }
}

export default Profile
