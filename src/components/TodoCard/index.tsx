import React, { useState } from "react";
import { updateChecked } from "../../apis";
import todoStore from "../../store";

function TodoCard(todo: any) {
  const [isChecked, setChecked] = useState(todo.isChecked);
  const toggleTodo = todoStore((state) => state.toggleTodo);

  const handleCheck = (e: any) => {
    console.log("id", todo.id);
    setChecked(e.target.checked);
    updateChecked(todo.id, e.target.checked);
    toggleTodo(todo.id);
  };

  return (
    <div style={{ display: "flex", gap: 4 }}>
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      {isChecked ? (
        <p style={{ textDecoration: "line-through" }}>{todo.label}</p>
      ) : (
        <p>{todo.label}</p>
      )}
    </div>
  );
}

export default TodoCard;
