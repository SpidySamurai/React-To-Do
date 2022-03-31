import React from "react";
import "./TodoItem.css";

function TodoItem(props) {
  const onComplete = () => {
    alert("Completaste el TODO " + props.text);
  };

  const onDelete = () => {
    alert("Eliminaste el TODO " + props.text);
  };

  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon__check ${
          props.completed && "Icon__check--active"
        }`}
        onClick={onComplete}
      ></span>
      <p
        className={`TodoItem__text ${
          props.completed && "TodoItem__text--complete"
        }`}
      >
        {props.text}
      </p>
      <span className="Icon Icon__delete" onClick={onDelete}></span>
    </li>
  );
}

export { TodoItem };
