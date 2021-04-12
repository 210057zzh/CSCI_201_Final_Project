import React, {useState, useReducer} from 'react';

const initialState = {
    showLogin: false,
    loggedIn: false,
    userName: '',
    /**
     *  Can add any more 'global variables' related to user login/signup here
     */
}

let authReducer = (state, action) => {
    switch(action.type) {
        case 'showLogin':
            return {...state, showLogin: action.payload}
        case 'loggedIn':
            return {...state, loggedIn: action.payload}
        default:
            return {...state}
    }
}

export const authContext = React.createContext(initialState);

function AuthContextProvider(props) {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    return(
        <authContext.Provider value={{authState, dispatch}}>
            {props.children}
        </authContext.Provider>
    )
}
export default AuthContextProvider;

