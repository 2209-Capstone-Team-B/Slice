import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggedInUser from './user.js';
import ecosystems from './ecosystems.js';
import singleEcosystem from './singleEcosystem.js';
import singleEcosystemTasks from './singleEcosystemTasks';
import userTasks from './userTasks.js';
import userInvites from './userInvites.js';
import ecosystemMembers from './ecosystemMembers.js';

const reducer = combineReducers({
  loggedInUser,
  ecosystems,
  singleEcosystem,
  singleEcosystemTasks,
  userTasks,
  userInvites,
  ecosystemMembers,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './user.js';
export * from './ecosystems.js';
export * from './singleEcosystem.js';
export * from './singleEcosystemTasks';
export * from './userTasks.js';
export * from './userInvites.js';
export * from './ecosystemMembers.js';
