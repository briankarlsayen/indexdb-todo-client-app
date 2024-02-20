import { useState } from "react";
import { routesPutApi } from "../../apis";
import todoStore from "../../store";

function TodoCard(todo: any) {
  const [isChecked, setChecked] = useState(todo.isChecked);
  const toggleTodo = todoStore((state) => state.toggleTodo);
  const isOnline = todoStore((state) => state.isOnline);

  const handleCheck = (e: any) => {
    setChecked(e.target.checked);
    routesPutApi({
      routeName: "todos/" + todo._id,
      params: {
        id: todo.todoId,
        isChecked: e.target.checked,
      },
    });
    toggleTodo(todo.id);
  };

  return (
    <div style={{ display: "flex", gap: 4 }}>
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
