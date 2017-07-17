import { combineReducers } from "redux";

const createList = (filter) => {
  const handleToogle = (state, action) => {
    const { result: id, entities } = action.response;
    const { completed } = entities.todos[id];
    const shouldRemove = (
      (completed && filter === "active") ||
      (!completed && filter === "completed")
    );

    return shouldRemove ? state.filter(t => t !== id) : state;
  };

  const ids = (state = [], action) => {
    switch(action.type) {
      case "FETCH_TODOS_SUCCESS":
        return filter === action.filter ?
          action.response.result :
          state;
      case "ADD_TODO_SUCCESS":
        return filter !== "completed" ?
          [...state, action.response.result] :
          state;
      case "TOOGLE_TODO_SUCCESS":
        return handleToogle(state, action);
      default:
        return state;
    }
  }
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch(action.type) {
      case "FETCH_TODOS_REQUEST":
        return true;
      case "FETCH_TODOS_SUCCESS":
      case "FETCH_TODOS_FAILURE":
        return false;
      default:
        return state;
    }
  }

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch(action.type) {
      case "FETCH_TODOS_FAILURE":
        return action.message;
      case "FETCH_TODOS_SUCCESS":
      case "FETCH_TODOS_REQUEST":
        return null;
      default:
        return state;
    }

  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
