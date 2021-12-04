import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {noteListReducer} from './reducers/noteReducers'
import {composeWithDevTools} from "redux-devtools-extension";


const initialState = {};
const reducer = combineReducers({
    noteList: noteListReducer
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;