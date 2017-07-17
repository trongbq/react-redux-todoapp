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
  delay(1000).then(() => {
    if (Math.random() > 0.75) {
      throw new Error("Boom!");
    };

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

export const addTodo = (text) =>
  delay(1000).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toogleTodo = (id) =>
  delay(1000).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });
