import React from "react";

function useStorageListener(sincronizeTodos, sincronizeCompletedTodos) {
  const [storageChange, setStorageChange] = React.useState(false);
  window.addEventListener("storage", (change) => {
    if (change.key === "TODOS_V1" || change.key === "TODOS_COMPLETED_V1") {
      console.log("There are changes on TODOS' LISTS" + change.key);
      setStorageChange(true);
    }
  });

  const toggleShow = () => {
    sincronizeTodos();
    sincronizeCompletedTodos();
    setStorageChange(false);
  };

  return {
    show: storageChange,
    toggleShow,
  };
}

export { useStorageListener };
