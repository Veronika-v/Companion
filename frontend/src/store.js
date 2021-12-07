import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {noteDetailsReducer, noteListReducer} from './reducers/noteReducers'
import {composeWithDevTools} from "redux-devtools-extension";
import {notificationReducer} from "./reducers/notifReducers";


const initialState = {};
const reducer = combineReducers({
    noteList: noteListReducer,
    noteDetails: noteDetailsReducer,
    noification : notificationReducer
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;