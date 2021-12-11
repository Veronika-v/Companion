import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {
    addNoteReducer,
    noteDetailsReducer,
    noteListReducer,
    userNoteListReducer,
    userRespondsReducer
} from './reducers/noteReducers'
import {composeWithDevTools} from "redux-devtools-extension";
import {notificationReducer} from "./reducers/notifReducers";
import {categoryListReducer} from "./reducers/categoryReducer";
import {userRegisterReducer, userSignInReducer} from "./reducers/userReducer";
import {genderListReducer} from "./reducers/genderReducer";


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
    userRegister : userRegisterReducer,
    userNoteList : userNoteListReducer,
    userResponds : userRespondsReducer,
    genders : genderListReducer,
    addNote : addNoteReducer,
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;