import React from 'react';
import './Modal.css'

const Modal = ({ isOpen, onClose, children }) => {
    if(!isOpen) return null;

    const childWithOnClose = React.cloneElement(children, { onClose })

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal-content">
                {childWithOnClose}
            </div>
        </>
    )
}

export default Modal;