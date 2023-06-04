import React from "react";
import "./TodoListContainer.css";

function TodoListContainer({children}) {
    return (
        <div className="TodoListContainer-container">
            {children}
        </div>
    );
}

export { TodoListContainer };
