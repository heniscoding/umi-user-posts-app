import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import "./App.css";

function App() {
  return (
    <Router basename="/umi-user-posts-app">
      <div className="App">
        <header className="App-header">
          <h1>Umi React Assignment</h1>
          <h4>Created by Henry Alderslade</h4>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:userId" element={<UserDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
