import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem || localStorageItem.length === 2) {
          const defaultTodos = [
            { text: "TODO test 1", completed: false },
            { text: "TODO test 2", completed: false },
            { text: "TODO test 3", completed: false },
            { text: "TODO test 4", completed: false },
            { text: "TODO test 5", completed: false },
            { text: "TODO test 6", completed: false },
            { text: "TODO test 7", completed: false },
          ];
          localStorage.setItem(itemName, JSON.stringify(defaultTodos));
          parsedItem = defaultTodos;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  }, []);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  return { item, saveItem, loading, error };
}

export { useLocalStorage };
