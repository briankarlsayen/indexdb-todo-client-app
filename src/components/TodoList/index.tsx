import React, { useEffect } from "react";
import TodoCard from "../TodoCard";
import { routesGetApi } from "../../apis";
import todoStore from "../../store";
import { useQuery } from "react-query";

function TodoList() {
  const setTodo = todoStore((state) => state.setTodo);

  const fetchTodos = async () => {
    const todos = await routesGetApi({ routeName: "todos" });
    setTodo(todos);
    return todos;
  };

  const {
    data: list,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({ queryKey: "todos", queryFn: fetchTodos });

  return (
    <div>
      {isError && <p>Unable to get todos</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess &&
        list?.map((todo, index) => (
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
