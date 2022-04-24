import React from "react";
import { useStorageListener } from "./useStorageListener";
import "./changeAlert.css";
function ChangeAlert({ sincronizeTodos, sincronizeCompletedTodos }) {
  const { show, toggleShow } = useStorageListener(
    sincronizeTodos,
    sincronizeCompletedTodos
  );
  if (show) {
    return (
      <div class="changeAlert__container">
        <p>There are changes...</p>;
        <button onClick={() => toggleShow(false)}>Recharge info</button>
      </div>
    );
  } else {
    return null;
  }
}

export { ChangeAlert };
