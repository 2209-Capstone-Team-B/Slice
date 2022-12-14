import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggedInUser from './user.js';
import ecosystems from './ecosystems.js';
import singleEcosystem from './singleEcosystem.js';
import singleEcosystemTasks from './singleEcosystemTasks';
import ecosystemMembers from './singleEcosystemMembers.js';
import userTasks from './userTasks.js';
import userInvites from './userInvites.js';
import notifications from './notifications.js'
import singleTaskHistory from './taskHistory.js'
import singleRewardRequests from './rewardRequests.js'
import isAdmin from './isAdmin.js'
import announcements from './announcements';
import rewardHistory from './rewardHistory.js'
import allAdmins from './allAdmins.js'

const reducer = combineReducers({
  loggedInUser,
  ecosystems,
  singleEcosystem,
  singleEcosystemTasks,
  userTasks,
  userInvites,
  ecosystemMembers,
  notifications,
  singleTaskHistory,
  singleRewardRequests,
  isAdmin,
  announcements,
  rewardHistory,
  allAdmins
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
export * from './singleEcosystemMembers';
export * from './userTasks.js';
export * from './userInvites.js';
export * from './notifications.js'
export * from './taskHistory.js'
export * from './rewardRequests.js'
export * from './isAdmin.js'
export * from './announcements.js';
export * from './rewardHistory.js'
export * from './allAdmins.js'
