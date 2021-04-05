import { NavLink, withRouter } from 'react-router-dom';

import '../css/Navbar.css';

function Navbar(props) {
    // *Need to set toggleLogin* as a required prop later.
    function showLoginScreen() {
        if (props.toggleLoginOn) {
            props.toggleLoginOn();
        }
    }
    function hideLoginScreen() {
        if (props.toggleLoginOff) {
            props.toggleLoginOff();
        }
    }
    return (
        <div className={'navbar ' + props.className}>
            <div className='navbar-left' onClick={hideLoginScreen}>
                <NavLink className='navlink' exact to='/'>Home</NavLink>
                <NavLink className='navlink' exact to='/discover'>Discover</NavLink>
                <NavLink className='navlink' exact to='/dashboard'>MyDashboard</NavLink>
            </div>
            <div className='navbar-right' >
                <div onClick={hideLoginScreen}></div>
                <div className='navlink' style={{ display: "inline-block" }} onClick={props.showLogin ? hideLoginScreen : showLoginScreen}>Log in</div>
                <div className='navlink' style={{ display: "inline-block" }} onClick={hideLoginScreen}>Sign up</div>
            </div>

        </div>
    )
}

export default withRouter(Navbar);