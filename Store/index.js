import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loggedInUser from "./user.js"
import ecosystems from './ecosystems.js'
import singleEcosystem from './singleEcosystem.js'
import userTasks from './userTasks.js'




const reducer = combineReducers({
loggedInUser,
ecosystems,
singleEcosystem,
userTasks
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./user.js";
export * from "./ecosystems.js"
export * from "./singleEcosystem.js"
export * from "./userTasks.js"

