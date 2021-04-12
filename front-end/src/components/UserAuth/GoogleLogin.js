import {useContext} from 'react';
import GoogleLoginReact from 'react-google-login';
import axios from 'axios';
import { authContext } from '../contexts/authContext';



function GoogleLogin(props) {
    const {authState, dispatch} = useContext(authContext)
    const REST_API_CALL = 'http://localhost:8080/api/googlelogin'

    function toggleLoginStatusOn() {
        dispatch({type: 'loggedIn', payload: true});
    }
    const refreshTokenSetup = (res) => {
        // Timing to renew access token
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            console.log('newAuthRes:', newAuthRes);
            // saveUserToken(newAuthRes.access_token);  <-- save new token
            localStorage.setItem('authToken', newAuthRes.id_token);

            // Setup the other timer after the first one
            setTimeout(refreshToken, refreshTiming);
        };

        // Setup first refresh timer
        setTimeout(refreshToken, refreshTiming);
    };

    const onSuccess = (res) => {
        console.log('success');
        var id_token = res.getAuthResponse().id_token;
        console.log(id_token);
        // Post to the backend to check if the user currently exists or if they need to set up their account
        axios.post(REST_API_CALL, id_token).then(resp => {
            if (resp.data.registered === true) { // The user already exists and has successfully logged in
                console.log('Login Success: currentUser:', res.profileObj);
                toggleLoginStatusOn();
                alert(
                    `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
                );
                dispatch({type: 'loggedIn', payload: true})
            } else { // The user does not already exist and needs to be redirected to the signup page
                console.log('User must be redirected to signup page')
            }
        });
        refreshTokenSetup();
    };

    const clientid = "467227431315-qfa0plniiro21687j2ifupq82cd7j6op.apps.googleusercontent.com";

    const onFailure = (res) => {
        console.log(authState.loggedIn)
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 `
        );
    };

    return (
        <GoogleLoginReact
            clientId={clientid}
            buttonText="Login to Sprout with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleLogin;