import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'
import UploadProfileImage from './UploadProfileImage'
import DeleteModal from '../../shared/DeleteModal'
function Profile() {
    const [modalShow, setModalShow] = useState(false)
    const { user, logoutUser, deleteUser } = useContext(UserContext)

    function handleLogout() {
        logoutUser()
    }

    async function handleDelete() {
        await deleteUser(user._id)
    }
    if (user) {
        return (
            <div className='profile-page'>
                <div className='profile-page-options'>
                    <h1 className='profile-page-header'>Account Options</h1>
                    <UploadProfileImage />
                    <h3>Logout</h3>
                    <div className='logout-button-container'>
                        <button
                            className='btn btn-secondary centered'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button
                            className='btn btn-decline centered'
                            onClick={() => setModalShow(true)}
                        >
                            Delete Account
                        </button>
                    </div>
                    <DeleteModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        item={user.name}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
        )
    } else {
        // return redirect('/login')
        return <Navigate to='/' replace />
    }
}

export default Profile
