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
                <div className='profile-page-options'>
                    <h2 className='profile-page-header'>Account Options</h2>
                    <UploadProfileImage />
                    <h3>Logout</h3>
                    <button
                        className='btn btn-secondary'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    } else {
        // return redirect('/login')
        return <Navigate to='/' replace />
    }
}

export default Profile
