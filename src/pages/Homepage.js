import React from "react";
import { useSearchParams } from "react-router-dom";
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
import { ChangeAlert } from "../ui/ChangeAlert";
import { Modal } from "../ui/Modal";
import { TodoForm } from "../ui/TodoForm";

function HomePage() {
  /* const navigate = useNavigate(); */
  /* const [params,setParams] = useSearchParams(); */
  const [params, setParams] = useSearchParams();
  const [openModal, setOpenModal] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState(null);

  const {
    error,
    loading,
    searchedTodos,
    searchedCompletedTodos,
    toggleCompleteTodo,
    deleteTodo,
    addTodo,
    editTodo,
    totalTodos,
    completedTodosText,
    searchValue,
    setSearchValue,
    sincronizeTodos,
    sincronizeCompletedTodos,
  } = useTodos();

  const onClickAdd = () => {
    setEditingTodo(null);
    setOpenModal(true);
  };

  const onClickEdit = (todo) => {
    setEditingTodo(todo);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditingTodo(null);
  };

  const handleSubmit = (newTodoData) => {
    if (editingTodo) {
      editTodo(
        editingTodo.id, 
        newTodoData.text, 
        newTodoData.priority, 
        newTodoData.dueDate, 
        editingTodo.completed
      );
    } else {
      addTodo(newTodoData);
    }
    closeModal();
  };

  return (
    <React.Fragment>
      <main className="Dashboard-container">
        <section className="Dashboard-sidebar">
          <TodoHeader loading={loading}>
            <TodoCounter
              totalTodos={totalTodos}
              completedTodosText={completedTodosText}
            />
            <TodoSearch
              params={params}
              setParams={setParams}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </TodoHeader>
          
          <div className="Sidebar-actions">
            <CreateTodoButton 
              onClick={onClickAdd}
            />
          </div>

          <ChangeAlert
            sincronizeTodos={sincronizeTodos}
            sincronizeCompletedTodos={sincronizeCompletedTodos}
          />
          
          <footer>
            <a href="https://github.com/SpidySamurai">@Javier Chi aka Spidy</a>
          </footer>
        </section>

        <section className="Dashboard-content">
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
                  priority={todo.priority || 'low'}
                  dueDate={todo.dueDate}
                  onToggleComplete={() => {
                    toggleCompleteTodo(todo.id, todo.completed);
                  }}
                  onEdit={() => onClickEdit(todo)}
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
                    priority={todo.priority || 'low'}
                    dueDate={todo.dueDate}
                    onToggleComplete={() => {
                      toggleCompleteTodo(todo.id, todo.completed);
                    }}
                    onEdit={() => onClickEdit(todo)}
                    onDelete={() => {
                      deleteTodo(todo.id, todo.completed);
                    }}
                  />
                )}
              />
            )}
          </TodoListContainer>
        </section>

        {openModal && (
          <Modal>
            <TodoForm 
              label={editingTodo ? "Editar TODO" : "Crear TODO"}
              submitText={editingTodo ? "Guardar" : "Añadir"}
              submitEvent={handleSubmit}
              onCancel={closeModal}
              defaultTodoText={editingTodo?.text}
              defaultTodoPriority={editingTodo?.priority}
              defaultTodoDate={editingTodo?.dueDate}
            />
          </Modal>
        )}
      </main>
    </React.Fragment>
  );
}

export default HomePage;
