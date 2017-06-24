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

export const authenticatedSuccessfully = claims => (dispatch) => {
  console.log(claims);
  dispatch({ type: AUTHENTICATED, payload: { email: claims.email, name: claims.name } });
};
