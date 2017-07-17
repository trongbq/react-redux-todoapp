import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import TodoList from "./TodoList";
import * as actions from "../actions";
import { getVisibleTodos, getIsFetching } from "../reducers"

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter != prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toogleTodo, isFetching, todos } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return <TodoList todos={todos} onTodoClick={toogleTodo}/>;
  }
}
const mapStateToTodoListProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  }
};
VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions, // auto wrap with dispatch then pass as props
)(VisibleTodoList));

export default VisibleTodoList;
