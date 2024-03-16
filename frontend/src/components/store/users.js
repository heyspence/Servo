import csrfFetch from "./csrf";

export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const updateUser = (userData) => async (dispatch) => {
  const res = await csrfFetch("/api/benches", {
    method: "POST",
    body: userData,
  });

  const updatedUser = await res.json();
  dispatch(receiveUser(updatedUser));
  return res;
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, [action.user._id]: action.user };
    default:
      return state;
  }
};
export default usersReducer;
