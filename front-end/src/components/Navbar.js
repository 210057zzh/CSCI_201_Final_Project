import { NavLink, withRouter } from 'react-router-dom';
import { useContext, useState } from 'react';
import { authContext } from './contexts/authContext';
import { useMediaQuery } from 'react-responsive'

import '../css/Navbar.css';

function Navbar(props) {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1050 }, undefined, resetState);
    // *Need to set toggleLogin* as a required prop later.
    const { authState, setAuthState } = useContext(authContext);
    const [isNavbarOpen, switchUse] = useState({ value: true });

    function toggleLoginScreen() {
        if (authState.showLogin) {
            setAuthState(prevState => { return { ...prevState, showLogin: false } });
        } else {
            setAuthState(prevState => { return { ...prevState, showLogin: true } });
        }

    }

    function toggleSignupScreen() {
        if (authState.showSignup) {
            setAuthState(prevState => { return { ...prevState, showSignup: false } });
        } else {
            setAuthState(prevState => { return { ...prevState, showSignup: true } });
        }
    }

    function logout() {
        setAuthState(prevState => { return { ...prevState, loggedIn: false, user: {} } });
    }

    function resetState() {
        switchUse(true);
    }

    function toggleNavBar() {
        if (isNavbarOpen == true) {
            //close it
            switchUse(false);
        } else {
            //open it
            switchUse(true);
        }

    }
    if (authState.loggedIn === false) {
        return (
            <div>
                { isDesktopOrLaptop ?
                    <div className={'navbar '}>
                        <div className='navbar-left'>
                            <NavLink className='navlink' exact to='/'>Home</NavLink>
                            <NavLink className='navlink' exact to='/discover'>Discover</NavLink>
                        </div>
                        <div className='navbar-right' style={{ whiteSpace: 'noWrap' }}>
                            <div className='navlink' style={{ display: "inline-block" }} onClick={toggleLoginScreen}>Log in</div>
                            <div className='navlink' style={{ display: "inline-block" }} onClick={toggleSignupScreen}>Sign up</div>
                        </div>
                    </div> :
                    <div>
                        <span style={{ fontSize: '30px', cursor: 'pointer', float: 'left', marginLeft: '20px', marginTop: '20px', color: 'white' }} onClick={toggleNavBar}>&#9776;</span>
                        <div style={{ textAlign: 'left', width: (isNavbarOpen ? '0px' : '50%') }} id='sideNav'>
                            <a href="javascript:void(0)" class="closebtn" onClick={toggleNavBar}>&times;</a>
                            <NavLink className='navlink' style={{ display: 'block' }} exact to='/'>Home</NavLink>
                            <NavLink className='navlink' style={{ display: 'block' }} exact to='/discover'>Discover</NavLink>
                            <div className='navlink' style={{ display: 'block', whiteSpace: 'nowrap' }} onClick={toggleLoginScreen}>Log in</div>
                            <div className='navlink' style={{ display: 'block', whiteSpace: 'nowrap' }} onClick={toggleSignupScreen}>Sign up</div>
                        </div>
                    </div>

                }

            </div>
        )
    }
    else if (authState.loggedIn === true) {
        return (
            <div>
                { isDesktopOrLaptop ?
                    <div className={'navbar '}>
                        <div className='navbar-left'>
                            <NavLink className='navlink' exact to='/'>Home</NavLink>
                            <NavLink className='navlink' exact to='/discover'>Discover</NavLink>
                            <NavLink className='navlink' exact to='/dashboard'>MyDashboard</NavLink>
                        </div>
                        <div className='navbar-right' style={{ whiteSpace: 'noWrap' }}>
                            <div className='navlink' style={{ display: "inline-block" }} onClick={logout}>Log out</div>
                        </div>

                    </div> :
                    <div>
                        <span style={{ fontSize: '30px', cursor: 'pointer', float: 'left', marginLeft: '20px', marginTop: '20px', color: 'white' }} onClick={toggleNavBar}>&#9776;</span>
                        <div style={{ textAlign: 'left', width: (isNavbarOpen ? '0px' : '22em') }} id='sideNav'>
                            <a href="javascript:void(0)" class="closebtn" onClick={toggleNavBar}>&times;</a>
                            <NavLink className='navlink' style={{display: 'block'}} exact to='/'>Home</NavLink>
                            <NavLink className='navlink' style={{display: 'block'}} exact to='/discover'>Discover</NavLink>
                            <NavLink className='navlink' style={{display: 'block'}} exact to='/dashboard'>MyDashboard</NavLink>
                            <div className='navlink' style={{display: 'block', whiteSpace: 'nowrap' }} onClick={logout}>Log out</div>
                        </div>
                    </div>

                }
            </div>
        )
    }
}

export default withRouter(Navbar);