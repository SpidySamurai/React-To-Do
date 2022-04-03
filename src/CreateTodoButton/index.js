import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const onClickButton = (msg) => {
    alert(msg);
  };

  return (
    <div className="CreateTodoButton">
      <button onClick={() => onClickButton("Abrir modal")}>+</button>
    </div>
  );
}

export { CreateTodoButton };
