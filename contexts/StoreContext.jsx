const { createContext, useReducer } = require("react");

export const StoreContext = createContext(null);

export const ACTION_TYPES = {
  SET_STORES: "SET_STORES",
  SET_LOCATION: "SET_LOCATION",
};

const storeReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_STORES:
      return { ...state, nearbyStores: payload.nearbyStores };
    case ACTION_TYPES.SET_LOCATION:
      return {
        ...state,
        latitude: payload.latitude,
        longitude: payload.longitude,
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const initialState = {
    nearbyStores: [],
    latitude: "",
    longitude: "",
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
