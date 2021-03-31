import {NavLink, withRouter} from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
    function submit() {
        // Google login here
    }
    return(
        <div className='navbar'>
            <div className='navbar-left'>
                <NavLink className='navlink' exact to='/'>Home</NavLink>
                <NavLink className='navlink' exact to='/discover'>Discover</NavLink>
                <NavLink className='navlink' exact to='/dashboard'>MyDashboard</NavLink>
            </div>
            <div className='navbar-right'>
                <div className='navlink' style={{display:"inline-block"}} onClick={submit}>Log in</div>
                <div className='navlink' style={{display:"inline-block"}}>Sign up</div>
            </div>
            
        </div>
    )
}

export default withRouter(Navbar);