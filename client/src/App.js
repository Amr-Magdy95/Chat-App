import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route } from "react-router-dom";

import Join from "./components/Join/Join.js";
import Chat from "./components/Chat/Chat.js";

const App = () => (
  <BrowserRouter>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </BrowserRouter>
);

export default App;
