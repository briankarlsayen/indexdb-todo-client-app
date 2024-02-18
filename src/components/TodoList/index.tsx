import React, { useEffect } from "react";
import TodoCard from "../TodoCard";
import { routesGetApi } from "../../apis";
import todoStore from "../../store";

function TodoList() {
  const setTodo = todoStore((state) => state.setTodo);
  const list = todoStore((state) => state.todos);

  const fetchTodos = async () => {
    const todos = await routesGetApi({ routeName: "todos" });
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
          _id={todo._id}
          todoId={todo.id}
          isChecked={todo.isChecked}
        />
      ))}
    </div>
  );
}

export default TodoList;
