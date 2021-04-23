import '../../css/Home.css';
import { useState, useContext, useEffect } from 'react';
import GoogleLogin from './GoogleLogin';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside'
import { authContext } from '../contexts/authContext';
import Error from './Error';
import { validateLoginForm } from './validate';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


/*
 Needs: 
    -Google sign-in api implementation
    -regex for email/pass
*/
const clickOutsideConfig = {
    handleClickOutside: () => Login.handleClickOutside
};
function Login(props) {
    const { authState, setAuthState } = useContext(authContext);
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [err, setErr] = useState();
    const REST_API_CALL = 'http://localhost:8080/api/login'
    const [emailerr, setEmailerr] = useState();
    const [pwerr, setPwerr] = useState();

    useEffect(() => {
        if (authState.LoginUpredirect === true) {
            setErr('Your google account is registered, please log in with google');
            setAuthState(prevState => { return { ...prevState, LoginUpredirect: false } });
        }
    });

    Login.handleClickOutside = (e) => {
        setAuthState(prevState => { return { ...prevState, showLogin: false } });
    };

    function updateEmail(e) {
        setEmail(e.target.value)
    }

    function updatePass(e) {
        setPass(e.target.value);
    }

    function submit(e) {
        var payload = {
            email: email,
            password: pass,
        };
        console.log(payload);
        var result = validateLoginForm(payload);
        setEmailerr(result.errors.email);
        setPwerr(result.errors.password);
        console.log(result);
        e.preventDefault();
        if (result.success === true) {
            axios.post(REST_API_CALL, [email, pass]).then(async (resp) => {
                console.log(resp);
                if (resp.data.successful === true) { // The user already exists and has successfully logged in
                    console.log('Login Success: currentUser:', resp.data);
                    setAuthState(prevState => { return { ...prevState, showLogin: false, loggedIn: true, user: resp.data } });
                } else { // The user does not already exist or some other error occured. Refer to error message to determine next steps
                    console.log('error: ' + resp.data.error);
                    setErr(resp.data.error);
                }
            }).catch(err => {
                console.log(err.message);
                setErr(err.message);
            });
        }
    }
    return (
        <div className='login-popup'>
            <div style={{ fontWeight: 'bold', fontSize: '30px', marginTop: '1em' }}>Sign in to Sprout</div>
            <div style={{ marginTop: '1em' }}><GoogleLogin LoggedinStatus={authState.loggedIn} buttonText={"Login to Sprout with Google"} signUporLogin={'Login'} /></div>
            <hr style={{ width: '30%', marginTop: '3em' }}></hr>
            <form className='login-form' onSubmit={submit}>
                <TextField
                    size='medium'
                    placeholder='email...'
                    margin='dense'
                    name="email"
                    label="email"
                    onChange={updateEmail}
                    error={emailerr}
                    helperText={emailerr ? emailerr : ''}
                />
                <br></br>
                <TextField
                    type='password'
                    size='medium'
                    placeholder='password...'
                    onChange={updatePass}
                    margin='dense'
                    name="pass"
                    label="password"
                    error={pwerr}
                    helperText={pwerr ? pwerr : ''}
                />
                <br></br>
                {err ? <Error errorMsg={err}></Error> : null}
                <br></br>
                <Button style={{ width: '20%', marginTop: '3em' }} className='login-btn' size="small" type="submit" variant="contained" >Log in</Button>
            </form>
        </div>
    );
}

export default onClickOutside(Login, clickOutsideConfig);