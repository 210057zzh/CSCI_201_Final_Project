import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useContext } from 'react';
import {authContext} from './contexts/authContext'

function Home(props) {
    const {authState} = useContext(authContext);

    return (
        <div className='home'>
            {authState.showLogin ? <Login/> : null}
            {authState.showLogin ? <div className='darkened'></div> : null}
            <Navbar/>
            <div className={'home-search'}>
                <div className='sprout'>Sprout</div>
                <SearchBar />
            </div>
        </div>
    )
}

export default Home;