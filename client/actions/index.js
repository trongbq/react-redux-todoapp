import { v4 } from "node-uuid";
import { getIsFetching } from "../reducers"
import * as api from "../api";

export const addTodo = (text) => ({
  type: "ADD_TODO",
  id: v4(),
  text: text
});

export const toogleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id: id
});

const requestTodos = (filter) => ({
  type: "REQUEST_TODOS",
  filter,
});

const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response
});

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return;
  }

  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};

