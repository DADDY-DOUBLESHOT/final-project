import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./src/store/reducers/userReducer";
import { loaderReducer } from "./src/store/reducers/loaderReducer";
import { booksReducer } from "./src/store/reducers/booksReducer";
const reducer = combineReducers({
  USER: userReducer,
  LOADER: loaderReducer,
  BOOKS: booksReducer,
});

let initialState = {};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
