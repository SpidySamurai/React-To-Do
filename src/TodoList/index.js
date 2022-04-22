import React from "react";
import "./TodoList.css";

function TodoList(props) {
  return (
    <section className="TodoList-container">
      <ul>
        {props.error && props.onError()}
        {props.loading && props.onLoading()}
        {/* {!props.loading && !props.searchedTodos.length && props.onEmptyTodos} */}
        {props.totalTodos &&
          !props.searchedTodos.length &&
          !props.totalCompleteTodos &&
          props.onEmptySearchResults(props.searchText)}
        {/* {props.searchedTodos.map(props.render)} */}
        {props.searchedTodos.map(props.render || props.children)}
      </ul>
    </section>
  );
}

export { TodoList };
