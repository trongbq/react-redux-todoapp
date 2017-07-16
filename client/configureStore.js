import { createStore } from "redux";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";
import todoApp from "./reducers"

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  if (!console.group) return rawDispatch;

  return (action) => {
    console.group(action.type);
    console.log("%c prev state", "color: grey", store.getState());
    console.log("action", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color: green" ,store.getState());
    console.groupEnd(action.type);
  }
}
const configureStore = () => {
  const persistedState = loadState();

  const store = createStore(todoApp, persistedState);

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
}

export default configureStore;
