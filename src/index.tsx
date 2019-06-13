import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";
import App from "./components/App";
import rootReducer from "./reduсers";

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
