import { NavLink, withRouter } from 'react-router-dom';
import {useContext} from 'react';
import {authContext} from './contexts/authContext';

import '../css/Navbar.css';

function Navbar(props) {
    // *Need to set toggleLogin* as a required prop later.
    const {authState, setAuthState} = useContext(authContext);

    function toggleLoginScreen() {
        if(authState.showLogin) {
            setAuthState(prevState => {return {...prevState, showLogin: false}});
        } else {
            setAuthState(prevState => {return {...prevState, showLogin: true}});
        }
        
    }

    function logout() {
        setAuthState(prevState => {return {...prevState, loggedIn: false}});
        window.location.replace('./')
    }
    if (authState.loggedIn === false) {
        return (
            <div className={'navbar '}>
                <div className='navbar-left'>
                    <NavLink className='navlink' exact to='/'>Home</NavLink>
                    <NavLink className='navlink' exact to='/discover'>Discover</NavLink>
                </div>
                <div className='navbar-right' style={{ whiteSpace: 'noWrap' }}>
                    <div className='navlink' style={{ display: "inline-block" }} onClick={toggleLoginScreen}>Log in</div>
                    <div className='navlink' style={{ display: "inline-block" }} >Sign up</div>
                </div>
            </div>
        )
    }
    else if (authState.loggedIn === true) {
        return (
            <div className={'navbar '}>
                <div className='navbar-left'>
                    <NavLink className='navlink' exact to='/'>Home</NavLink>
                    <NavLink className='navlink' exact to='/discover'>Discover</NavLink>
                    <NavLink className='navlink' exact to='/dashboard'>MyDashboard</NavLink>
                </div>
                <div className='navbar-right' style={{ whiteSpace: 'noWrap' }}>
                    <div className='navlink' style={{ display: "inline-block" }} onClick={logout}>Log out</div>
                </div>

            </div>
        )
    }
}

export default withRouter(Navbar);