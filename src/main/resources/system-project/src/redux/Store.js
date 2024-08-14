import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
import authReducer from "./Auth/Reducer";
import chatReducer from "./Chat/Reducers";
import commentReducer from "./Comment/Reducers";
import projectReducer from "./Project/Reducers";
import subscriptionReducer from "./Subscription/Reducers";
import taskReducer from "./Task/Reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  chat: chatReducer,
  comment: commentReducer,
  task: taskReducer,
  subscription: subscriptionReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
