import { BASE_URL } from ".";
import { db } from "./db";

export const addTodoApi = async (props) => {
  const { _id, label, isChecked, updatedAt, createdAt } = props;
  await db.todos.add({ _id, label, isChecked, updatedAt, createdAt });
};
export const deleteTodo = async (id) => {
  await db.todos.where("id").equals(id).delete();
};
export const getTodos = async () => {
  const todos = await db.todos.toArray();
  return todos;
};
export const updateChecked = async (id, props) => {
  const todo = await db.todos.where("_id").equals(id).toArray();
  if (todo.length) return await db.todos.update(todo[0].id, props);
  console.log("unable to update todo on local");
};

export const synchronizeData = async () => {
  try {
    // Fetch the latest data from the server
    const serverData = await fetch(BASE_URL + "/todos");
    const serverJson = await serverData.json();

    // Compare and merge data using Dexie
    await db.transaction("rw", db.todos, async () => {
      for (const serverRecord of serverJson) {
        // Check if the record exists in the local database
        const localRecord = await db.todos
          .where("_id")
          .equals(serverRecord._id)
          .toArray();
        const item = localRecord.length ? localRecord.pop() : null;

        // Compare timestamps or versioning to determine which record is more recent
        if (
          !item ||
          new Date(serverRecord.updatedAt) > new Date(item?.updatedAt)
        ) {
          // Update or add the record in IndexedDB
          if (!item) {
            await db.todos.put(serverRecord);
          } else {
            await db.todos.update(item?.id, serverRecord);
          }
          // ;
        }
      }
    });

    console.log("Data synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing data:", error);
  }
};
