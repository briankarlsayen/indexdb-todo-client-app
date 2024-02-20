import React, { useState } from "react";
import { routesPutApi } from "../../apis";
import todoStore from "../../store";
import { useMutation, useQueryClient } from "react-query";

function TodoCard(todo: any) {
  const [isChecked, setChecked] = useState(todo.isChecked);
  const toggleTodo = todoStore((state) => state.toggleTodo);
  const isOnline = todoStore((state) => state.isOnline);

  const handleCheckTodo = async (e) => {
    return await routesPutApi({
      routeName: "todos/" + todo._id,
      params: {
        id: todo.todoId,
        isChecked: e.target.checked,
      },
    });
  };

  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationFn: handleCheckTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "todos",
        exact: true,
      });
    },
  });

  const handleCheck = (e: any) => {
    setChecked(e.target.checked);
    mutate(e);
    toggleTodo(todo.id);
  };

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {isError && <p>Unable to update todo</p>}
      {isOnline && (
        <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      )}
      {isChecked ? (
        <p style={{ textDecoration: "line-through" }}>{todo.label}</p>
      ) : (
        <p>{todo.label}</p>
      )}
    </div>
  );
}

export default TodoCard;
