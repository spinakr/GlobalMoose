const AUTHENTICATED = 'facebook/AUTHENTICATED';

const initialState = {
  authenticated: false,
  email: '',
  name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED: {
      return {
        ...state,
        authenticated: true,
        email: action.payload.email,
        name: action.payload.name,
      };
    }

    default:
      return state;
  }
};

export const authenticatedSuccessfully = (email, name) => (dispatch) => {
  console.log(email);
  console.log(name);
  dispatch({ type: AUTHENTICATED, payload: { email, name } });
};
