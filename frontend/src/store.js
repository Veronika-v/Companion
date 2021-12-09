import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {noteDetailsReducer, noteListReducer} from './reducers/noteReducers'
import {composeWithDevTools} from "redux-devtools-extension";
import {notificationReducer} from "./reducers/notifReducers";
import {categoryListReducer, subcategoryListReducer} from "./reducers/categoryReducer";


const initialState = {};
const reducer = combineReducers({
    noteList: noteListReducer,
    noteDetails: noteDetailsReducer,
    notification : notificationReducer,
    categories : categoryListReducer,
    subcategories : subcategoryListReducer,
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;