import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Top } from "./features/top/Top";
import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import { Chat } from "./features/chat/Chat";

Amplify.configure({
  ...awsconfig,
  Auth: {
    storage: window.sessionStorage,
    //   cookieStorage: {
    //     domain: "localhost:3000",
    //     path: "/",
    //     expires: 365,
    //     secure: true,
    //   },
  },
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
