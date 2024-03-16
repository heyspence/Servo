import csrfFetch from "./csrf";
import { receiveErrors } from "./errors";

export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

// export const updateUser = (userData, userId) => async (dispatch) => {
//   console.log("🦋🦋🦋 ~ userData:", userData);
//   // debugger;
//   const res = await csrfFetch(`/api/users/${userId}`, {
//     method: "PATCH",
//     body: JSON.stringify(userData),
//   });
//   debugger;

//   console.log('🦋🦋🦋 ~ res:', res);
//   const updatedUser = await res.json();
//   console.log('🦋🦋🦋 ~ updatedUser:', updatedUser);
//   dispatch(receiveUser(updatedUser));
//   return res;
// };

export const updateUser = (userData, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify({ user: userData }),
  });
  debugger
  if (res.ok) {
    let data = await res.json();
    // dispatch({ type: RECEIVE_USER, user: data.user });
    RECEIVE_USER(data.user);
  } else {
    let data = await res.json();
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
