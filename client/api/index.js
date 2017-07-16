import { v4 } from "node-uuid";

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: "Hey",
    completed: true,
  }, {
    id: v4(),
    text: "Foo",
    completed: true,
  }, {
    id: v4(),
    text: "Let's go",
    completed: false,
  }],
};

const delay = (ms) => (
  new Promise(resolve => setTimeout(resolve, ms))
);

export const fetchTodos = (filter) => (
  delay(500).then(() => {
    switch(filter) {
      case "all":
        return fakeDatabase.todos;
      case "active":
        return fakeDatabase.todos.filter(t => !t.completed);
      case "completed":
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`Unknown filter ${filter}`);
    }
  })
);
