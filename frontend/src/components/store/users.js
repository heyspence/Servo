import csrfFetch from "./csrf";
import { receiveErrors } from "./errors";

export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const updateUser = (userData) => async (dispatch) => {
  console.log('🦋🦋🦋 ~ userData:', userData);
  const res = await csrfFetch(`/api/users/${userData.id}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify({ user: userData }),
  });

  let data = await res.json();

  if (res.ok) {
    receiveUser(data.user);
  } else {
    dispatch(receiveErrors(data.errors));
  }
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