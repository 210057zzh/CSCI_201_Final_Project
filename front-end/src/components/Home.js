import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useState } from 'react';

function Home(props) {
    const [showLogin, setShowLogin] = useState(false);
    function toggleLoginOn() {
        setShowLogin(true);
    }
    function toggleLoginOff(e) {
        setShowLogin(false);
    }
    function toggleLoginStatusOn() {
        if (props.toggleLoginStatusOn)
            props.toggleLoginStatusOn();
    }
    function toggleLoginStatusOff() {
        if (props.toggleLoginStatusOff)
            props.toggleLoginStatusOff();
    }



    return (
        <div className='home'>
            {showLogin ? <Login LoginStatus={props.LoginStatus} toggleLoginStatusOn={toggleLoginStatusOn} toggleLoginStatusOff={toggleLoginStatusOff} LoginbyGoogle={props.LoginbyGoogle} setLoginbyGoogle={props.setLoginbyGoogle} toggleLoginOff={toggleLoginOff} /> : null}
            <Navbar toggleLoginOn={toggleLoginOn}
                toggleLoginOff={toggleLoginOff}
                className={showLogin ? 'darkened' : ''}
                showLogin={showLogin}
                LoginStatus={props.LoginStatus}
                toggleLoginStatusOn={toggleLoginStatusOn}
                toggleLoginStatusOff={toggleLoginStatusOff} />
            <div className={showLogin ? 'darkened home-search' : 'home-search'}>
                <div className='sprout'>Sprout</div>
                <SearchBar />
            </div>
            <div className={showLogin ? 'darkened lower' : 'lower'} >
            </div>
        </div>
    )
}

export default Home;