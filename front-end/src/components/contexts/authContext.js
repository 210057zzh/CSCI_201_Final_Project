import React, { useState } from 'react';

const initialState = {
    showLogin: false,
    loggedIn: false,
    user: {},
    showSignup: false,
    googleToken: '',
    signUpredirect: false,
    Loginredirect: false,
    BusinessEdit: {
    },
    BusinessEditErrs: {
    },
    newBusiness: false,
    uploadReady: false,
    showReview: false,
    businessID: '',
    showYelp: false
    /**
     *  Can add any more 'global variables' related to user login/signup here
     */
}


export const authContext = React.createContext(initialState);

function AuthContextProvider(props) {
    const [authState, setAuthState] = useState(initialState)
    return (
        <authContext.Provider value={{ authState, setAuthState }}>
            {props.children}
        </authContext.Provider>
    )
}
export default AuthContextProvider;

