import React from 'react';
import './OldModal.css'

const OldModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const childWithOnClose = React.cloneElement(children, { onClose })

    return (
        <>
            <div className="old-modal-backdrop" onClick={onClose}></div>
            <div className="old-modal-content">
                {childWithOnClose}
            </div>
        </>
    )
}

export default OldModal