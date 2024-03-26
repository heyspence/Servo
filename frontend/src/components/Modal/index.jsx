import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/ui";
import "./Modal.css"
import ReviewShow from "../Reviews/ReviewShow";

const Modal = () => {
  const dispatch = useDispatch()
  const modal = useSelector(state => state?.ui?.modal)

  if (!modal) return null;

  let component;

  switch (modal.modalTitle) {
    case "review-show":
      component = <ReviewShow props={modal.props}/>;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-backdrop" onClick={() => dispatch(closeModal())}>
      <div className={`modal-content`} onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

export default Modal

// import React from 'react';
// import './Modal.css'

// const Modal = ({ isOpen, onClose, children }) => {
//     if(!isOpen) return null;

//     const childWithOnClose = React.cloneElement(children, { onClose })

//     return (
//         <>
//             <div className="modal-backdrop" onClick={onClose}></div>
//             <div className="modal-content">
//                 {childWithOnClose}
//             </div>
//         </>
//     )
// }

// export default Modal;