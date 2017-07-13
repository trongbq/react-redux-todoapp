import { connect } from "react-redux";
import TodoList from "./TodoList";
import { toogleTodo } from "../actions";

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(todo => todo.completed);
    case "SHOW_ACTIVE":
      return todos.filter(todo => !todo.completed);
  }
};

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick: (id) => {
    dispatch(toogleTodo(id));
  }
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

export default VisibleTodoList;
