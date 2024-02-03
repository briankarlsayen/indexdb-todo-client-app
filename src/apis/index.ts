import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

export const addTodoApi = async (data: any) => {
  try {
    const todosCount = await getTodosApi();
    console.log("todosCount", todosCount.length);
    const todoObj = {
      id: todosCount.length ?? 0,
      label: data.label,
      isChecked: false,
    };
    await db.todos.add(todoObj);
    console.log("add todo");
  } catch (error) {
    console.log("err", error);
    console.log("failed to add todo");
  }
};

export const getTodosApi = async () => {
  try {
    return await db.todos.toArray();
  } catch (error) {
    console.log("failed to get todos");
  }
};

export const updateChecked = async (id: number, value) => {
  try {
    const item = db.todos.where({ id }).first();
    console.log("item", item);
    return await db.todos.where({ id }).modify({
      isChecked: value,
    });
  } catch (error) {
    console.log("failed to update check of todo");
  }
};
