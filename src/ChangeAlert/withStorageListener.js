import React from "react";

function withStorageListener(WrappedComponent) {
  return function WrappedComponentWithStorageListener(props) {
    const [storageChange, setStorageChange] = React.useState(false);
    window.addEventListener("storage", (change) => {
      if (change.key === "TODOS_V1" || change.key === "TODOS_COMPLETED_V1") {
        console.log("There are changes on TODOS' LISTS" + change.key);
        setStorageChange(true);
      }
    });

    const toggleShow = () => {
      props.sincronizeTodos();
      props.sincronizeCompletedTodos();
      setStorageChange(false);
    };

    return <WrappedComponent show={storageChange} toggleShow={toggleShow} />;
  };
}

export { withStorageListener };
