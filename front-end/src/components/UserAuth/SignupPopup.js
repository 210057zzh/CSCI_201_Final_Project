import '../../css/Home.css';
import { useState, useContext, useEffect } from 'react';
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
    handleClickOutside: () => Signup.handleClickOutside
};
function Signup(props) {
    const { authState, setAuthState } = useContext(authContext);
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [SecondPass, setSecondPass] = useState();
    const [err, setErr] = useState();
    const REST_API_CALL = 'http://localhost:8080/api/Signup'

    useEffect(() => {
        if (authState.signUpredirect === true) {
            setErr('Your google account is not registered, please sign up with google first');
            setAuthState(prevState => { return { ...prevState, signUpredirect: false } });
        }
    });


    Signup.handleClickOutside = (e) => {
        setAuthState(prevState => { return { ...prevState, showSignup: false } });
    };

    function updateEmail(e) {
        setEmail(e.target.value)
    }

    function updatePass(e) {
        setPass(e.target.value);
    }

    function submit(e) {
        e.preventDefault();
        axios.post(REST_API_CALL, [email, pass]).then(async (resp) => {
            console.log(resp);
            if (resp.data.successful === true) { // The user already exists and has successfully logged in
                console.log('Signup Success: currentUser:', resp.data);
                setAuthState(prevState => { return { ...prevState, showSignup: false, loggedIn: true } });
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
        <div className='Signup-popup'>
            <div style={{ fontWeight: 'bold', fontSize: '36px', marginTop: '1em' }}>Sign up to Sprout</div>
            <div style={{ marginTop: '4em' }}><GoogleLogin LoggedinStatus={authState.loggedIn}
                buttonText="Sign up with Google" signUporLogin={'Signup'} /> </div>
            <hr style={{ width: '70%', marginTop: '4em' }}></hr>
            <form className='Signup-form'>
                <input type='text' placeholder='Email...' onChange={updateEmail} required />
                <input type='password' placeholder='Password...' onChange={updatePass} required />
                {err ? <Error errorMsg={err}></Error> : null}
                <input type="submit" className='Signup-btn' onClick={submit} align="center" />
            </form>
        </div>
    );
}

export default onClickOutside(Signup, clickOutsideConfig);