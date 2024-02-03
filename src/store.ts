import { create } from "zustand";
type Todo = {
  id?: number;
  label: string;
  isChecked?: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (label: string) => void;
  toggleTodo: (id: number) => void;
  setTodo: (list: Todo[]) => void;
};

const todoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodo: (list) => set((state) => ({ todos: list })),
  addTodo: (label) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), label, isChecked: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.isChecked } : todo
      ),
    })),
}));

export default todoStore;
