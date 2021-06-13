import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const OrderCompleteModal = ({show, setShow, cart}) => {
    const handleClose = () => setShow(false);
    const history = useHistory();

    // const cartProducts: ICart_products[] = cart.products;
    const download = () => {
        console.log('Creating Receipt');
        handleClose(); // Closing the modal
        // setTimeout to make sure modal is closed before taking picture
        setTimeout(() => {
            window.print()
            history.push('/')
        }, 500)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} id='receipt'>
                <Modal.Header closeButton>
                    <Modal.Title> Order has been successfully placed! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p onClick={download}> In order to download the receipt, press <span
                        style={{textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer'}}> here </span></p>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button
                        variant="primary"
                        onClick={() => history.push('/')}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OrderCompleteModal;
