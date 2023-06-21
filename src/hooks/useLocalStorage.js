import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const { sincronizedItem, error, loading, item } = state;

  // ACTION CREATORS
  const onError = (error) =>
    dispatch({
      type: actionTypes.error,
      payload: error,
    });

  const onSuccess = (item) =>
    dispatch({
      type: actionTypes.success,
      payload: item,
    });

  const onSave = (item) =>
    dispatch({
      type: actionTypes.save,
      payload: item,
    });

  const onSincronize = () =>
    dispatch({
      type: actionTypes.sincronize,
    });

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem || localStorageItem.length === 2) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 400);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [sincronizedItem]);

  const saveItem = (updateFunction) => {
    try {
      const prevItem = JSON.parse(localStorage.getItem(itemName));
      const newItem = updateFunction(prevItem);
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  };
  return { item, saveItem, loading, error, sincronizeItem };
}
const initialState = () => ({
  sincronizedItem: true,
  error: false,
  loading: true,
  item: [],
});

const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
  sincronize: "SINCRONIZE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };
