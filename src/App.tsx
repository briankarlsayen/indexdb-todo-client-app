import { useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { checkOnline } from "./utils";
import todoStore from "./store";

function App() {
  const setOnline = todoStore((state) => state.setOnline);
  const isOnline = todoStore((state) => state.isOnline);

  useEffect(() => {
    const onlineAvail = async () => {
      setOnline((await checkOnline()) ?? false);
    };
    onlineAvail();
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
