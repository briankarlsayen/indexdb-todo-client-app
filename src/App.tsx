import { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <>
      <h1>TodoList</h1>
      <TodoForm />
      <TodoList />
    </>
  );
}

export default App;
