import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Top } from "./features/top/Top";
import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure({
  ...awsconfig,
  Auth: {
    cookieStorage: {
      domain: "localhost:3000",
      path: "/",
      expires: 365,
      secure: true,
    },
  },
});

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
