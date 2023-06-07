import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import EditTodoPage from "./EditTodoPage";
import NewTodoPage from "./NewTodoPage";
import NotFound from "./NotFound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={NewTodoPage}/>
        <Route path="/edit/:id" element={<EditTodoPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
