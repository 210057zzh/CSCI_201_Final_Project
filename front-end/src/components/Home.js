import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import {useState} from 'react';

function Home() {
    const [showLogin, setShowLogin] = useState(false);
    function toggleLoginOn() {
        setShowLogin(true);
    }
    function toggleLoginOff(e) {
        setShowLogin(false);
    }
    return(
        <div className='home'>
            {showLogin ? <Login/> : null}
            <Navbar toggleLoginOn={toggleLoginOn} toggleLoginOff={toggleLoginOff} className={showLogin ? 'darkened' : ''}/>
            <div className={showLogin ? 'darkened home-search' : 'home-search'} onClick={toggleLoginOff}>
                <div className='sprout'>Sprout</div>
                <SearchBar/>
            </div>
            <div className={showLogin ? 'darkened lower' : 'lower'} onClick={toggleLoginOff}>
            </div>
        </div>
    )
}

export default Home;