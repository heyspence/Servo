export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalTitle, props) => ({
  type: OPEN_MODAL,
  payload: { modalTitle: modalTitle, props: props },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

const initialState = {modal: null}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { modal: {...action.payload} };
    case "CLOSE_MODAL":
      return initialState; 
    default:
      return initialState;
  }
};

export default uiReducer;