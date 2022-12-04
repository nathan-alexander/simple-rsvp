function InvitedUser(props) {
    return (
        <div className='invited-user'>
            {props.user.name}
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
