import React from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { TodoHeader } from "../ui/TodoHeader";
import { TodoSearch } from "../ui/TodoSearch";
import { TodoCounter } from "../ui/TodoCounter";
import { TodoListContainer } from "../ui/TodoListContainer";
import { TodoList } from "../ui/TodoList";
import { TodoCompletedList } from "../ui/TodoCompletedList";
import { TodoLoading } from "../ui/TodoLoading";
import { TodoError } from "../ui/TodoError";
import { TodoEmpty } from "../ui/TodoEmpty";
import { TodoItem } from "../ui/TodoItem";
import { CreateTodoButton } from "../ui/CreateTodoButton";
import { TodoForm } from "../ui/TodoForm";
import { Modal } from "../ui/Modal";
import { ChangeAlert } from "../ui/ChangeAlert";

function HomePage() {
  const navigate = useNavigate();
  const {
    error,
    loading,
    empty,
    searchedTodos,
    searchedCompletedTodos,
    toggleCompleteTodo,
    deleteTodo,
    addTodo,
    editTodo,
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
        <TodoListContainer>
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
                  toggleCompleteTodo(todo.id, todo.completed);
                }}
                onEdit={() => {
                  navigate(
                    '/edit/' + todo.id,
                    {
                      state: { todo }
                    },
                  );
                }}
                onDelete={() => {
                  deleteTodo(todo.id, todo.completed);
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
                    toggleCompleteTodo(todo.id, todo.completed);
                  }}
                  onEdit={() => {
                    navigate(
                      '/edit/' + todo.id,
                      {
                        state: { todo }
                      },
                    );
                  }}
                  onDelete={() => {
                    deleteTodo(todo.id, todo.completed);
                  }}
                />
              )}
            />
          )}
        </TodoListContainer>
        <footer>
          <a href="https://github.com/SpidySamurai">@Javier Chi aka Spidy</a>
        </footer>
        {/* {openModal && (
          <Modal>
            <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
          </Modal>
        )} */}
        <CreateTodoButton 
          onClick={() => navigate('/new')}
        // setOpenModal={setOpenModal} 
        />
      </main>
    </React.Fragment>
  );
}

export default HomePage;
