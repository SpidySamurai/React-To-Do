import React from "react";
import "./TodoCompletedList.css";

function TodoCompletedList(props) {
  return (
    <section className="TodoCompletedList-container">
      {props.searchedCompletedTodos.length > 0 && <h2>Completed TODOS</h2>}
      <ul>{props.searchedCompletedTodos.map(props.render)}</ul>
    </section>
  );
}

export { TodoCompletedList };
