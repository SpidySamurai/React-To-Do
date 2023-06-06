import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./home/Homepage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route></Route>
        <Route></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
