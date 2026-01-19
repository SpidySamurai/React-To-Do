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
      <div className="TodoItem__content">
        <p
          className={`TodoItem__text ${
            props.completed && "TodoItem__text--complete"
          }`}
        >
          {props.text}
        </p>
        <div className="TodoItem__meta">
          {props.priority && (
            <span className={`TodoItem__badge TodoItem__badge--${props.priority}`}>
              {props.priority === 'low' && 'Low'}
              {props.priority === 'medium' && 'Medium'}
              {props.priority === 'high' && 'High'}
            </span>
          )}
          {props.dueDate && (
            <span className="TodoItem__date">📅 {props.dueDate}</span>
          )}
        </div>
      </div>
      <span className="Icon Icon__edit" onClick={props.onEdit}></span>
      <span className="Icon Icon__delete" onClick={props.onDelete}></span>
    </li>
  );
}

export { TodoItem };
