import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
function DeleteModal(props) {
    return (
        <Modal {...props} size='lg' centered>
            <Modal.Header closeButton closeLabel='Close'>
                <Modal.Title>Delete {props.item}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to delete {props.item}?</h4>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-secondary' onClick={props.onHide}>
                    Close
                </button>
                <button
                    className='btn btn-decline'
                    onClick={props.handleDelete}
                >
                    Delete
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
