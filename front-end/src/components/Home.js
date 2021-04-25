import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useContext } from 'react';
import { authContext } from './contexts/authContext';
import logo from '../css/img/leaf.png';
import Signup from './UserAuth/SignupPopup'

function Home(props) {
    const { authState } = useContext(authContext);

    return (
        <div className='home'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {(authState.showLogin || authState.showSignup) ? <div className='darkened'></div> : null}
            <Navbar />
            <div className={'home-search'}>
                <div style={{ paddingTop: '10%' }}>
                    <div className='sprout'>Sprout</div>
                    <img src={logo} className="logo"></img>
                </div>
                <SearchBar />
            </div>
        </div>
    )
}

export default Home;