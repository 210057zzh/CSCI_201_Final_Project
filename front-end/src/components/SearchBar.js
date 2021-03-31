import {useState} from 'react';
import '../css/SearchBar.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    
    function handleChange(e) {
        setSearch(e.target.value);
    }

    function submitSearch(e) {
        e.preventDefault();
        console.log(search);
    }

    return (
        <div className='search-bar'>
            <form onSubmit={submitSearch}>
                <input type='text' placeholder='search...' onChange={handleChange}></input>
            </form>
        </div>
    )
}

export default SearchBar;