import React from "react";
import "./TodoItem.css";

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon__check ${
          props.completed && "Icon__check--active"
        }`}
        onClick={props.onToggleComplete}
      ></span>
      <p
        className={`TodoItem__text ${
          props.completed && "TodoItem__text--complete"
        }`}
      >
        {props.text}
      </p>
      <span className="Icon Icon__delete" onClick={props.onDelete}></span>
    </li>
  );
}

export { TodoItem };
