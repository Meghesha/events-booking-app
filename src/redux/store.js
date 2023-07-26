import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let middleWares = [logger,thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));