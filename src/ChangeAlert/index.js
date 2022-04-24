import React from "react";
import { withStorageListener } from "./withStorageListener";
import "./changeAlert.css";
function ChangeAlert({ show, toggleShow }) {
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

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export { ChangeAlertWithStorageListener };
