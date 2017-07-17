import { combineReducers } from "redux";
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

const allIds = createList("all");
const activeIds = createList("active");
const completedIds = createList("completed");

const listByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
});

const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) => 
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) => 
  fromList.getErrorMessage(state.listByFilter[filter]);
