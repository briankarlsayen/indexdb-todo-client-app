import Dexie, { Table } from "dexie";

export interface Todo {
  id?: number;
  label: string;
  isChecked?: boolean;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  todos!: Table<Todo>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      todos: "id, label, isChecked", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
