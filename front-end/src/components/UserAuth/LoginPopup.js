import '../../css/Home.css';
import {useState} from 'react';
/*
 Needs: 
    -Google sign-in api implementation
    -regex for email/pass
*/
function Login () {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    function updateEmail(e) {
        setEmail(e.target.value)
    }

    function updatePass(e) {
        setPass(e.target.value);
    }

    function submit() {
        console.log('email: ' + email);
        console.log('pass: ' + pass);
    }
    return (
        <div className='login-popup'>
            <div style={{fontWeight:'bold', fontSize:'36px', marginTop:'1em'}}>Sign in to Sprout</div>
            <div style={{marginTop:'4em'}}>-Google Button Here-</div>
            <hr style={{width: '70%', marginTop: '4em'}}></hr>
            <div className='login-form'>
                    <input type='text' placeholder='Email...' onChange={updateEmail}></input>
                    <input type='password' placeholder='Password...' onChange={updatePass}></input>
                    <div className='login-btn' onClick={submit}>
                        <p>Log in</p>
                    </div>
            </div>
        </div>
    )
}

export default Login;