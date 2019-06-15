import React from "react";
import { applyMiddleware, createStore } from "redux";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { save, load } from "redux-localstorage-simple";
// import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
// import logger from 'redux-logger'
import { AppContainer } from "./components/App";
import rootReducer from "./actionsRedusers";
/*
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(),
    logger,
  ]
});
*/
const createStoreWithMiddleware = applyMiddleware(
  save({ states: ["scoreBoard"] })
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  load({ states: ["scoreBoard"] })
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
