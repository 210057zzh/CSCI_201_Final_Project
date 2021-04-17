import '../../css/Home.css';
import { useState , useContext, useEffect} from 'react';
import GoogleLogin from './GoogleLogin';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside'
import { authContext } from '../contexts/authContext';
import Error from './Error';



/*
 Needs: 
    -Google sign-in api implementation
    -regex for email/pass
*/
const clickOutsideConfig = {
    handleClickOutside: () => Login.handleClickOutside
};
function Login(props) {
    const {authState, setAuthState} = useContext(authContext);
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [err, setErr] = useState();
    const REST_API_CALL = 'http://localhost:8080/api/login'

    Login.handleClickOutside = (e) => {
        setAuthState(prevState => {return {...prevState, showLogin: false}});
    };

    function updateEmail(e) {
        setEmail(e.target.value)
    }

    function updatePass(e) {
        setPass(e.target.value);
    }

    function submit(e) {
        e.preventDefault();
        axios.post(REST_API_CALL, [email, pass]).then(async(resp) => {
            console.log(resp);
            if (resp.data.successful === true) { // The user already exists and has successfully logged in
                console.log('Login Success: currentUser:', resp.data);
                setAuthState(prevState => {return {...prevState, showLogin: false, loggedIn: true}});
            } else { // The user does not already exist or some other error occured. Refer to error message to determine next steps
                console.log('error: ' + resp.data.error);
                setErr(resp.data.error);
            }
        }).catch(err => {
            console.log(err.message);
            setErr(err.message);
        });
    }
    return (
        <div className='login-popup'>
            <div style={{ fontWeight: 'bold', fontSize: '36px', marginTop: '1em' }}>Sign in to Sprout</div>
            <div style={{ marginTop: '4em' }}><GoogleLogin LoggedinStatus={authState.loggedIn} /></div>
            <hr style={{ width: '70%', marginTop: '4em' }}></hr>
            <form className='login-form'>
                <input type='text' placeholder='Email...' onChange={updateEmail} required />
                <input type='password' placeholder='Password...' onChange={updatePass} required />
                {err ? <Error errorMsg={err}></Error> : null}
                <input type="submit" className='login-btn' onClick= {submit} align="center" />
            </form>
        </div>
    );
}

export default onClickOutside(Login, clickOutsideConfig);