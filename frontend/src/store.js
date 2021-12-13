import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {
    addNoteReducer, deleteNoteReducer,
    noteDetailsReducer,
    noteListReducer, updateNoteReducer,
    userNoteListReducer,
    userRespondsReducer
} from './reducers/noteReducers'
import {composeWithDevTools} from "redux-devtools-extension";
import {notificationReducer} from "./reducers/notifReducers";
import {categoryListReducer} from "./reducers/categoryReducer";
import {userDetailsReducer, userRegisterReducer, userSignInReducer} from "./reducers/userReducer";
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
    updateNote : updateNoteReducer,
    deleteNote : deleteNoteReducer,
    userDetails : userDetailsReducer,
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;