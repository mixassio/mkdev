import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { save, load } from "redux-localstorage-simple";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import App from "./components/App";
import rootReducer from "./actionsRedusers";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), save({ states: ["scoreBoard"] })],
  preloadedState: {
    scoreBoard: load({ states: ["scoreBoard"] })!.scoreBoard
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
