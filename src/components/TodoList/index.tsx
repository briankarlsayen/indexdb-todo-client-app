import React, { useEffect } from "react";
import TodoCard from "../TodoCard";
import { getTodosApi } from "../../apis";
import todoStore from "../../store";

interface Todo {
  id?: number;
  label: string;
  isChecked?: boolean;
}

function TodoList() {
  const setTodo = todoStore((state) => state.setTodo);
  const list = todoStore((state) => state.todos);

  const fetchTodos = async () => {
    const todos = await getTodosApi();
    setTodo(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {list?.map((todo, index) => (
        <TodoCard
          key={index}
          label={todo?.label}
          id={todo.id}
          isChecked={todo.isChecked}
        />
      ))}
    </div>
  );
}

export default TodoList;
