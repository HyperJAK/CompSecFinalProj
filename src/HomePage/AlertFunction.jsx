import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from "react-bootstrap";

export default function Alert({showSessionExpiredModal, handleCloseSessionExpiredModal}){
    return (<>
        <Modal show={showSessionExpiredModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Session Expired</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Your session has expired. Please log in again.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseSessionExpiredModal}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    </>   )

}