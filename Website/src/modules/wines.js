import { getWines, setWineStatus } from '../services/wineCoolerService';

const GET_WINES_STARTED = 'wines/GET_WINES_STARTED';
const GET_WINES_SUCCEED = 'wines/GET_WINES_SUCCEED';
const GET_WINES_FAILED = 'wines/GET_WINES_FAILED';
const ARCHIVE_WINE_STARTED = 'wines/ARCHIVE_WINE_STARTED';
const ARCHIVE_WINE_SUCCEED = 'wines/ARCHIVE_WINE_SUCCEED';
const ARCHIVE_WINE_FAILED = 'wines/ARCHIVE_WINE_FAILED';
const TOGGLE_FILTER = 'wines/TOGGLE_FILTER';
const RESET_FILTER = 'wines/RESET_FILTER';
const TO_INSTOCK_STARTED = 'wines/TO_INSTOCK_STARTED';
const TO_INSTOCK_SUCCEED = 'wines/TO_INSTOCK_SUCCEED';
const TO_INSTOCK_FAILED = 'wines/TO_INSTOCK_FAILED';

export const ADD_WINE_TO_LIST = 'wines/ADD_WINE_TO_LIST';

const initialState = {
  inStock: [],
  archive: [],
  shoppingList: [],
  isGettingWines: false,
  activeFilters: [],
};

const shouldBeHidden = (wineType, filterType) => {
  if (filterType === 'Muserende') {
    return !(wineType.includes('Champ') ||
             wineType.includes('Perl') ||
             wineType.includes('Cava') ||
             wineType.includes('Crem') ||
             wineType.includes('Mus'));
  }
  return !wineType.includes(filterType);
};

const applyFilters = (wines, filters) => {
  if (filters.length === 0) {
    return wines.map((wine) => {
      return {
        ...wine,
        isHidden: false,
      };
    });
  }
  return wines.map((wine) => {
    return {
      ...wine,
      isHidden: !filters.some((filter) => {
        return !shouldBeHidden(wine.info.type, filter);
      }),
    };
  });
};

const removeFromList = (list, removedWine) => {
  return list.filter((wine) => {
    return !(wine.info.vinmonopoletId === removedWine.vinmonopoletId && wine.ids.length === 1);
  }).map((wine) => {
    if (wine.info.vinmonopoletId === removedWine.vinmonopoletId) {
      return {
        ...wine,
        ids: [wine.ids.filter((id) => { return id !== removedWine.rowKey; })],
      };
    }
    return wine;
  });
};

const addNewToList = (list, wine) => {
  return [...list, { info: wine, ids: [wine.rowKey], isHidden: false }];
};

const addToAlreadyExisting = (list, newWine) => {
  return list.map((wine) => {
    if (wine.info.vinmonopoletId === newWine.vinmonopoletId) {
      return {
        ...wine,
        ids: [...wine.ids, newWine.rowKey],
      };
    }
    return wine;
  });
};

const notAlreadyInList = (list, archivedWine) => {
  return !list.some((wine) => {
    return wine.info.vinmonopoletId === archivedWine.vinmonopoletId;
  });
};

const setAllToVisible = (wines) => {
  return wines.map((wine) => {
    return {
      ...wine,
      isHidden: false,
    };
  });
};

const toggleActiveFilters = (activeFilters, toggleFilter) => {
  if (!activeFilters.includes(toggleFilter)) {
    return [...activeFilters, toggleFilter];
  }
  return activeFilters.filter((filter) => {
    return filter !== toggleFilter;
  });
};

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_WINES_STARTED: {
      return {
        ...state,
        isGettingWines: true,
      };
    }

    case GET_WINES_SUCCEED: {
      const wines = JSON.parse(action.payload.wines);
      return {
        ...state,
        inStock: wines.inStock.map((wine) => { return { ...wine, isHidden: false }; }),
        archive: wines.archived.map((wine) => { return { ...wine, isHidden: false }; }),
        shoppingList: wines.shoppingList.map((wine) => { return { ...wine, isHidden: false }; }),
      };
    }

    case GET_WINES_FAILED: {
      return {
        ...state,
        isGettingwines: false,
      };
    }

    case ADD_WINE_TO_LIST: {
      const newWine = JSON.parse(action.payload.wine);
      const status = action.payload.status;

      if (status === 'instock') {
        if (notAlreadyInList(state.inStock, newWine)) {
          return {
            ...state,
            inStock: addNewToList(state.inStock, newWine),
          };
        }
        return {
          ...state,
          inStock: addToAlreadyExisting(state.inStock, newWine),
        };
      }
      if (notAlreadyInList(state.shoppingList, newWine)) {
        return {
          ...state,
          shoppingList: addNewToList(state.shoppingList, newWine),
        };
      }
      return {
        ...state,
        shoppingList: addToAlreadyExisting(state.shoppingList, newWine),
      };
    }

    case TOGGLE_FILTER: {
      const filters = toggleActiveFilters(state.activeFilters, action.payload.type);
      return {
        ...state,
        inStock: applyFilters(state.inStock, filters),
        archive: applyFilters(state.archive, filters),
        activeFilters: filters,
      };
    }

    case RESET_FILTER: {
      return {
        ...state,
        inStock: setAllToVisible(state.inStock),
        archive: setAllToVisible(state.archive),
        activeFilters: [],
      };
    }

    case ARCHIVE_WINE_STARTED: {
      return {
        ...state,
        inStock: state.inStock.map((wine) => {
          return {
            ...wine,
            isUpdating: wine.RowKey === action.payload.id,
          };
        }),
      };
    }

    case ARCHIVE_WINE_SUCCEED: {
      const archivedWine = JSON.parse(action.payload.archivedWine);
      if (notAlreadyInList(state.archive, archivedWine)) {
        return {
          ...state,
          archive: addNewToList(state.archive, archivedWine),
          inStock: removeFromList(state.inStock, archivedWine),
        };
      }
      return {
        ...state,
        archive: addToAlreadyExisting(state.archive, archivedWine),
        inStock: removeFromList(state.inStock, archivedWine),
      };
    }

    case ARCHIVE_WINE_FAILED: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    }

    case TO_INSTOCK_STARTED: {
      return {
        ...state,
        shoppingList: state.shoppingList.map((wine) => {
          return {
            ...wine,
            isUpdating: wine.RowKey === action.payload.id,
          };
        }),
      };
    }

    case TO_INSTOCK_SUCCEED: {
      const inStockWine = JSON.parse(action.payload.inStockWine);
      if (notAlreadyInList(state.shoppingList, inStockWine)) {
        return {
          ...state,
          inStock: addNewToList(state.inStock, inStockWine),
          shoppingList: removeFromList(state.shoppingList, inStockWine),
        };
      }
      return {
        ...state,
        inStock: addToAlreadyExisting(state.inStock, inStockWine),
        shoppingList: removeFromList(state.shoppingList, inStockWine),
      };
    }

    case TO_INSTOCK_FAILED: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    }

    default:
      return state;
  }
};

export const fetchWines = () => (dispatch) => {
  dispatch({ type: GET_WINES_STARTED });
  getWines().then((wines) => {
    dispatch({ type: GET_WINES_SUCCEED, payload: { wines } });
  }).catch((errorMessage) => {
    dispatch({ type: GET_WINES_FAILED, payload: { errorMessage: errorMessage.message } });
  });
};

export const archiveWine = id => formData => (dispatch) => {
  dispatch({ type: ARCHIVE_WINE_STARTED, payload: { id } });
  setWineStatus('archive')(id, formData).then((archivedWine) => {
    dispatch({ type: ARCHIVE_WINE_SUCCEED, payload: { archivedWine } });
  }).catch((errorMessage) => {
    dispatch({ type: ARCHIVE_WINE_FAILED, payload: { errorMessage: errorMessage.message } });
  });
};

export const moveToInStock = id => (dispatch) => {
  dispatch({ type: TO_INSTOCK_STARTED, payload: { id } });
  setWineStatus('instock')(id).then((inStockWine) => {
    dispatch({ type: TO_INSTOCK_SUCCEED, payload: { inStockWine } });
  }).catch((errorMessage) => {
    dispatch({ type: TO_INSTOCK_FAILED, payload: { errorMessage: errorMessage.message } });
  });
};

export const toggleFilter = (type) => {
  return { type: TOGGLE_FILTER, payload: { type } };
};

