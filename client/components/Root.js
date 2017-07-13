import React from "react";
import { Provider } from "react-redux";
import TodoApp from "./TodoApp";
import { BrowserRouter, Route } from "react-router-dom";

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={TodoApp} />
    </BrowserRouter>
  </Provider>
);

export default Root;
