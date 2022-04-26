import React from "react";
import { useTodos } from "./useTodos";
import { TodoHeader } from "../TodoHeader";
import { TodoSearch } from "../TodoSearch";
import { TodoCounter } from "../TodoCounter";
import { TodoList } from "../TodoList";
import { TodoCompletedList } from "../TodoCompletedList";
import { TodoLoading } from "../TodoLoading";
import { TodoError } from "../TodoError";
import { TodoEmpty } from "../TodoEmpty";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoForm } from "../TodoForm";
import { Modal } from "../Modal";
import { ChangeAlert } from "../ChangeAlert";

function App() {
  const {
    error,
    loading,
    empty,
    searchedTodos,
    searchedCompletedTodos,
    toggleCompleteTodo,
    deleteTodo,
    addTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodosText,
    searchValue,
    setSearchValue,
    sincronizeTodos,
    sincronizeCompletedTodos,
  } = useTodos();

  return (
    <React.Fragment>
      <main>
        <TodoHeader loading={loading}>
          <TodoCounter
            totalTodos={totalTodos}
            completedTodosText={completedTodosText}
          />
          <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </TodoHeader>
        <ChangeAlert
          sincronizeTodos={sincronizeTodos}
          sincronizeCompletedTodos={sincronizeCompletedTodos}
        />
        <TodoList
          error={error}
          loading={loading}
          searchedTodos={searchedTodos}
          totalCompleteTodos={searchedCompletedTodos.length}
          searchText={searchValue}
          totalTodos={totalTodos}
          onError={() => <TodoError />}
          onLoading={() => <TodoLoading />}
          onEmptyTodos={() => <TodoEmpty />}
          onEmptySearchResults={(searchText) => (
            <p>There is no results for {searchText}</p>
          )}
        >
          {(todo) => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onToggleComplete={() => {
                toggleCompleteTodo(todo.text, todo.completed);
              }}
              onDelete={() => {
                deleteTodo(todo.text, todo.completed);
              }}
            />
          )}
        </TodoList>
        {searchedCompletedTodos && (
          <TodoCompletedList
            loading={loading}
            searchedCompletedTodos={searchedCompletedTodos}
            render={(todo) => (
              <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onToggleComplete={() => {
                  toggleCompleteTodo(todo.text, todo.completed);
                }}
                onDelete={() => {
                  deleteTodo(todo.text, todo.completed);
                }}
              />
            )}
          />
        )}
        {openModal && (
          <Modal>
            <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
          </Modal>
        )}
        <CreateTodoButton setOpenModal={setOpenModal} />
      </main>
    </React.Fragment>
  );
}

export { App };
