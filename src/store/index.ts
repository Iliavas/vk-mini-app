import {createStore, combineReducers, applyMiddleware} from 'redux';
import tokenReducer from './slices/VkToken';
import activePanelReducer from './slices/activePanel';
import usernameReducer from './slices/username';
import friendsReducer from './slices/friends';
import { middleware } from './middleware';

const baseReducer = combineReducers({
  tokenReducer, 
  activePanelReducer, 
  usernameReducer, 
  friendsReducer
})

const store = createStore(baseReducer, applyMiddleware(middleware));

export default store;
export type StoreType = ReturnType<typeof store.getState>;