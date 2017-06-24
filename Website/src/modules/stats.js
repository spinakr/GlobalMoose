import { getStats } from '../services/wineCoolerService';


const FETCH_STATS_STARTED = 'form/FETCH_STATS_STARTED';
const FETCH_STATS_SUCCESS = 'form/FETCH_STATS_SUCCESS';
const FETCH_STATS_FAILED = 'form/FETCH_STATS_FAILED';

const initialState = {
  fetchingStats: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS_STARTED: {
      return {
        ...state,
        fetchingStats: true,
      };
    }
    case FETCH_STATS_SUCCESS: {
      return {
        ...JSON.parse(action.payload.stats),
        fetchingStats: false,
      };
    }
    case FETCH_STATS_FAILED: {
      return {
        ...state,
        fetchingStats: false,
        errorMessage: action.payload.errorMessage,
      };
    }

    default:
      return state;
  }
};

export const fetchStats = () => (dispatch) => {
  dispatch({ type: FETCH_STATS_STARTED });
  getStats().then((stats) => {
    dispatch({ type: FETCH_STATS_SUCCESS, payload: { stats } });
  }).catch((errorMessage) => {
    dispatch({ type: FETCH_STATS_FAILED, payload: { errorMessage: errorMessage.message } });
  });
};
