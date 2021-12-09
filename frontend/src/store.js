import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {noteDetailsReducer, noteListReducer} from './reducers/noteReducers'
import {composeWithDevTools} from "redux-devtools-extension";
import {notificationReducer} from "./reducers/notifReducers";
import {categoryListReducer} from "./reducers/categoryReducer";
import {userSignInReducer} from "./reducers/userReducer";


const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo')
            ?JSON.parse(localStorage.getItem('userInfo'))
            :null,
    }
};
const reducer = combineReducers({
    noteList: noteListReducer,
    noteDetails: noteDetailsReducer,
    notification : notificationReducer,
    categories : categoryListReducer,
    userSignIn : userSignInReducer,
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;