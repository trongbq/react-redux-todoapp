import { v4 } from "node-uuid";

export const addTodo = (text) => ({
  type: "ADD_TODO",
  id: v4(),
  text: text
});

export const toogleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id: id
});

