import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";

const todo = (state, action) => {
  switch(action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch(action.type) {
    case "ADD_TODO":
      return [
        ...state,
        todo(undefined, action)
      ]
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch(action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

let nextTodoId = 0;
const addTodo = (text) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text: text
});

const toogleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id: id
});

const setVisibilityFilter = (filter) => ({
  type: "SET_VISIBILITY_FILTER",
  filter: filter
});

// Presentational Component
const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{ children }</span>;
  }

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      { children }
    </a>
  );
};

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

// Presentational Component
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li key={ todo.id }
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    { text }
  </li>
);

// Presentational Component
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    { todos.map(todo =>
      <Todo
        key={todo.id}
        { ...todo }    
        onClick={() => onTodoClick(todo.id)}
      />
    ) }
  </ul>
);

// Presentational Component
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = "";
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

// Presentational Component
const Footer = (props, { store }) => (
  <p>
    Show: {" "}
    <FilterLink filter="SHOW_ALL" >All</FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE" >Active</FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink>
  </p>
);

Footer.contextTypes = {
  store: React.PropTypes.object
}

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

const TodoApp = ({ store }) => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

const persistedState = {
  todos: [{
    id: "0",
    text: "Welcome back!",
    completed: false,
  }]
};

const store = createStore(todoApp, persistedState);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
