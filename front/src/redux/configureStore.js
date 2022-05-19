import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import application from "./features/application";
import user from "./features/user";

export const store = createStore(
  combineReducers({
    application,
    user,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
