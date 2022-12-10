import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
function InvitedUser(props) {
    return (
        <div className='invited-user'>
            {props.user.name} {props.publicUser && <span>{' (public)'}</span>}
            {props.attendees.some((user) => user._id === props.user._id) ? (
                <FontAwesomeIcon
                    icon={faCheck}
                    className='attending-checkmark'
                />
            ) : (
                <></>
            )}
            {props.userIsOwner && (
                <span
                    className='uninvite-action'
                    onClick={() =>
                        props.handleUninvite(props.event._id, props.user._id)
                    }
                >
                    x
                </span>
            )}
        </div>
    )
}

export default InvitedUser
