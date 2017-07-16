import { connect } from "react-redux";
import { withRouter } from "react-router";
import TodoList from "./TodoList";
import { toogleTodo } from "../actions";
import { getVisibleTodos } from "../reducers"

const mapStateToTodoListProps = (state, ownProps) => ({
  todos: getVisibleTodos(state, ownProps.match.params.filter || "all")
});
const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  { onTodoClick: toogleTodo }
)(TodoList));

export default VisibleTodoList;
