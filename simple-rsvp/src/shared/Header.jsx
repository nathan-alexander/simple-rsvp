import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
function Header() {
    const { user } = useContext(UserContext)
    console.log(user)
    return (
        <header className='header'>
            <NavLink to='/'>
                <div className='header-text header-font'>Simple RSVP</div>
            </NavLink>
            <nav className='header-nav'>
                <ul className='nav-elements'>
                    {user ? (
                        <>
                            <NavLink to='/invitations'>
                                <li className='nav-element link'>
                                    Invitations
                                </li>
                            </NavLink>

                            <NavLink to='/create'>
                                <li className='nav-element link'>Create</li>
                            </NavLink>
                            <NavLink to='/nearme'>
                                <li className='nav-element link'>Near Me</li>
                            </NavLink>
                            <NavLink to='/profile'>
                                <li className='nav-element link'>
                                    {user.profileImageUrl ? (
                                        <img
                                            src={user.profileImageUrl}
                                            className='profile-image-small'
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faUser} />
                                    )}
                                </li>
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to='/login'>
                            <li className='nav-element link'>Login</li>
                        </NavLink>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
