import { connect } from "react-redux";
import { withRouter } from "react-router";
import TodoList from "./TodoList";
import { toogleTodo } from "../actions";

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case "all":
      return todos;
    case "completed":
      return todos.filter(todo => todo.completed);
    case "active":
      return todos.filter(todo => !todo.completed);
  }
};

const mapStateToTodoListProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.match.params.filter || "all")
});
const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  { onTodoClick: toogleTodo }
)(TodoList));

export default VisibleTodoList;
