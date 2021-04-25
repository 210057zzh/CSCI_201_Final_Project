import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useContext, useState, useEffect } from 'react';
import { authContext } from './contexts/authContext';
import logo from '../css/img/leaf.png';
import Signup from './UserAuth/SignupPopup'
import { useHistory } from 'react-router-dom';

function Home(props) {
    let history = useHistory();
    const { authState } = useContext(authContext);
    const [search, setSearch] = useState('');

    function handleChange(e) {
        setSearch(e.target.value);
    }

    function submitSearch(e) {
        props.history.push({
            pathname: '/discover',
            default: search,
        });
    }

    return (
        <div className='home'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {(authState.showLogin || authState.showSignup) ? <div className='darkened'></div> : null}
            <Navbar />
            <div className={'home-search'}>
                <div style={{ display: 'inline-flex', paddingTop: '10%' }}>
                    <div className='sprout'>Sprout</div>
                    <img src={logo} width='50px' style={{ margin: '0 0 0 20px' }}></img>
                </div>
                <div className='search-bar'>
                    <form onSubmit={submitSearch} style={{ display: 'inline' }}>
                        <input type='text' className='field' placeholder='search...' onChange={handleChange} id="temporary"></input>
                        <input type='button' className='searchButton' value='filter' onClick={submitSearch}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home;