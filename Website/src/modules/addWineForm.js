import { postWine } from '../services/wineCoolerService';
import { ADD_WINE_TO_LIST } from './wines';


const POST_WINE_STARTED = 'form/POST_WINE_STARTED';
const POST_WINE_SUCCESS = 'form/POST_WINE_SUCCESS';
const POST_WINE_FAILED = 'form/POST_WINE_FAILED';
const RESET_FORM = 'form/RESET_FORM';

const initialState = {
  postingWine: false,
  newWineAddedName: '',
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_WINE_STARTED: {
      return {
        ...state,
        postingWine: true,
      };
    }
    case POST_WINE_SUCCESS: {
      return {
        ...state,
        vinmonopoletId: '',
        postingWine: false,
        newWineAddedName: action.payload.wine.name,
      };
    }
    case POST_WINE_FAILED: {
      return {
        ...state,
        postingWine: false,
        errorMessage: action.payload.errorMessage,
      };
    }
    case RESET_FORM: {
      return initialState;
    }
    default:
      return state;
  }
};

export const addNewWine = status => form => (dispatch) => {
  dispatch({ type: POST_WINE_STARTED });
  postWine(form.vinmonopoletId, { ...form, status })
  .then((wine) => {
    dispatch({ type: ADD_WINE_TO_LIST, payload: { status, wine } });
    dispatch({ type: POST_WINE_SUCCESS, payload: { wine: JSON.parse(wine) } });
    setTimeout(() => {
      dispatch({ type: RESET_FORM });
    }, 5000);
  }).catch((errorMessage) => {
    dispatch({ type: POST_WINE_FAILED, payload: { errorMessage } });
    setTimeout(() => {
      dispatch({ type: RESET_FORM });
    }, 5000);
  });
};
