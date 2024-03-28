import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/ui";
import "./Modal.css"
import ReviewShow from "../Reviews/ReviewShow";
import ReviewForm from "../Reviews/ReviewForm";

const Modal = () => {
  const dispatch = useDispatch()
  const modal = useSelector(state => state?.ui?.modal)

  if (!modal) return null;

  let component;

  switch (modal.modalTitle) {
    case "review-show":
      component = <ReviewShow props={modal.props}/>;
      break;
    case "review-form":
      component = <ReviewForm props={modal.props}/>;
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