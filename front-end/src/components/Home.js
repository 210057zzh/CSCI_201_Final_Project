import Navbar from './Navbar';
import SearchBar from './SearchBar';
import '../css/Home.css';

function Home() {
    return(
        <div className='home'>
            <Navbar/>
            <div className='home-search'>
                <div className='sprout'>Sprout</div>
                <SearchBar/>
            </div>
        </div>
    )
}

export default Home;