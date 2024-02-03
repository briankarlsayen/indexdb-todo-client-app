import React, { useState } from "react";
import { addTodoApi } from "../../apis";
import todoStore from "../../store";

function TodoForm() {
  const [text, setText] = useState("");
  const addTodo = todoStore((state) => state.addTodo);
  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (text) {
      console.log("add todo", text);
      await addTodoApi({ label: text });
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input type="text" onChange={handleChange} value={text} />
      <button onClick={handleAdd}>Add</button>
    </form>
  );
}

export default TodoForm;
