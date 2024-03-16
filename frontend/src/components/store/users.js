import csrfFetch from "./csrf";

export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const updateUser = (userData) => async (dispatch) => {
  console.log("🦋🦋🦋 ~ userData:", userData);
  // debugger;
  const res = await csrfFetch(`/api/users/${userData.id}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });

  const updatedUser = await res.json();
  console.log('🦋🦋🦋 ~ res:', res);
  console.log('🦋🦋🦋 ~ updatedUser:', updatedUser);
  debugger
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
