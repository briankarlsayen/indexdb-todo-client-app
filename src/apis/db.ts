import Dexie, { Table } from "dexie";

export interface Todo {
  id?: number;
  _id: string;
  label: string;
  isChecked?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  todos!: Table<Todo>;

  constructor() {
    super("todoDB");
    this.version(1).stores({
      todos: "++id, _id, label, isChecked, updatedAt, createdAt", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
