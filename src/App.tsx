import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Top } from "./features/top/top";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Top />} />
      </Routes>
    </div>
  );
}

export default App;
