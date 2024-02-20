import { create } from "zustand";
type Todo = {
  id?: number;
  _id?: string;
  label: string;
  isChecked?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
};

type TodoStore = {
  todos: Todo[];
  isOnline: boolean;
  addTodo: (label: string) => void;
  toggleTodo: (id: number) => void;
  setTodo: (list: Todo[]) => void;
  setOnline: (online: boolean) => void;
};

const todoStore = create<TodoStore>((set) => ({
  todos: [],
  isOnline: false,
  setOnline: (online) => set(() => ({ isOnline: online })),
  setTodo: (list) => set(() => ({ todos: list })),
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
