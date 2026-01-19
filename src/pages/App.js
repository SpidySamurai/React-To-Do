import React from "react";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/700.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import NotFound from "./NotFound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
