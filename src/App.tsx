import { useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { checkOnline } from "./utils";
import todoStore from "./store";
import { synchronizeData } from "./apis/dexieApi";

function App() {
  const setOnline = todoStore((state) => state.setOnline);
  const isOnline = todoStore((state) => state.isOnline);

  const getFreshData = async () => {
    await synchronizeData();
  };

  useEffect(() => {
    const onlineAvail = async () => {
      setOnline((await checkOnline()) ?? false);
    };
    onlineAvail();
    getFreshData();
  }, []);
  return (
    <>
      <h1>TodoList</h1>
      {isOnline && <TodoForm />}
      <TodoList />
    </>
  );
}

export default App;
