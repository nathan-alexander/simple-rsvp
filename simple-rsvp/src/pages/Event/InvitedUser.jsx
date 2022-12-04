import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
function InvitedUser(props) {
    return (
        <div className='invited-user'>
            {props.user.name}
            {props.attendees.some((user) => user._id === props.user._id) ? (
                <FontAwesomeIcon icon={faCheck} />
            ) : (
                <></>
            )}
            {props.userIsOwner && (
                <button
                    onClick={() =>
                        props.handleUninvite(props.event._id, props.user._id)
                    }
                >
                    Uninvite
                </button>
            )}
        </div>
    )
}

export default InvitedUser
