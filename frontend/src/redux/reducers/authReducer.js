const InitialState = {
    isAuth: false,
    token: null,
    user: null,
}

const userReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_USER":    
    console.log('Reducer - UPDATE_USER:', payload);
    return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuth: true,
    }
    case "LOGOUT":
      return InitialState
    default:
      return state;
  }
};

export default userReducer;