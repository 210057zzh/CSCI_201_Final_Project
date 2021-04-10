import '../../css/Home.css';
import { useState } from 'react';
import GoogleLogin from './GoogleLogin';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside'



/*
 Needs: 
    -Google sign-in api implementation
    -regex for email/pass
*/
const clickOutsideConfig = {
    handleClickOutside: () => Login.handleClickOutside
};
function Login(props) {
    const REST_API_CALL = 'http://localhost:8080/api/login'
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    Login.handleClickOutside = () => props.toggleLoginOff();

    function updateEmail(e) {
        setEmail(e.target.value)
    }

    function updatePass(e) {
        setPass(e.target.value);
    }
    function toggleLoginStatusOn() {
        if (props.toggleLoginStatusOn)
            props.toggleLoginStatusOn();
    }
    function toggleLoginStatusOff() {
        if (props.toggleLoginStatusOff)
            props.toggleLoginStatusOff();
    }

    function submit() {
        console.log('email: ' + email);
        console.log('pass: ' + pass);
        axios.post(REST_API_CALL, [email, pass]).then(resp => {
            if (resp.data.successful === true) { // The user already exists and has successfully logged in
                console.log('Login Success: currentUser:', resp.data);
                alert(
                    `Logged in successfully welcome ${email} 😍. \n See console for full profile object.`
                );
            } else { // The user does not already exist or some other error occured. Refer to error message to determine next steps
                console.log(resp.data.error);
            }
        });

    }
    return (
        <div className='login-popup'>
            <div style={{ fontWeight: 'bold', fontSize: '36px', marginTop: '1em' }}>Sign in to Sprout</div>
            <div style={{ marginTop: '4em' }}><GoogleLogin LoggedinStatus={props.LoggedinStatus} toggleLoginStatusOn={toggleLoginStatusOn} toggleLoginStatusOff={toggleLoginStatusOff} /></div>
            <hr style={{ width: '70%', marginTop: '4em' }}></hr>
            <form className='login-form'>
                <input type='text' placeholder='Email...' onChange={updateEmail} required />
                <input type='password' placeholder='Password...' onChange={updatePass} required />
                <input type="submit" className='login-btn' onClick="submit" value="Log in" align="center" />
            </form>
        </div>
    );
}

export default onClickOutside(Login, clickOutsideConfig);