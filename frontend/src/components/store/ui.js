export const OPEN_MODAL = "ui/OPEN_MODAL";
export const CLOSE_MODAL = "ui/CLOSE_MODAL";
export const SET_HOME_VIEW = "ui/SET_HOME_VIEW";

export const openModal = (modalTitle, props) => ({
  type: OPEN_MODAL,
  payload: { modalTitle: modalTitle, props: props },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const setHomeView = (view) => ({
  type: SET_HOME_VIEW,
  payload: view,
});

const initialState = {
  modal: null,
  homeView:
    JSON.parse(sessionStorage.getItem("currentUser"))?.userType || "user", // this is inconsistent sometimes this is undefined even if its in sessionStorage
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modal: { ...action.payload } };
    case CLOSE_MODAL:
      return { ...state, modal: null };
    case SET_HOME_VIEW:
      return { ...state, homeView: action.payload };
    default:
      return state;
  }
};

export default uiReducer;
