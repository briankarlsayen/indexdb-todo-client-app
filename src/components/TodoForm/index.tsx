import React, { useState } from "react";
import { routesPostApi } from "../../apis";
import todoStore from "../../store";
import { useMutation, useQueryClient } from "react-query";

function TodoForm() {
  const [text, setText] = useState("");
  const addTodo = todoStore((state) => state.addTodo);
  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const handleAddTodo = async () => {
    return await routesPostApi({
      routeName: "todos",
      params: {
        label: text,
      },
    });
  };

  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationFn: handleAddTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "todos",
        exact: true,
      });
    },
  });

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (text) {
      mutate();
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input type="text" onChange={handleChange} value={text} />
      <button onClick={handleAdd}>Add</button>
      {isError && <p>Unable to add todo</p>}
    </form>
  );
}

export default TodoForm;
