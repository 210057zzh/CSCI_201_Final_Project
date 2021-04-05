import {useState} from 'react';
import '../css/SearchBar.css';
import axios from 'axios';

function SearchBar() {
    const [search, setSearch] = useState('');
	const REST_API_CALL = 'http://localhost:8080/api/search'
	
    function handleChange(e) {
        setSearch(e.target.value);
    }

    function submitSearch(e) {
        e.preventDefault();
		axios.get(REST_API_CALL).then(resp => {
			document.getElementById("temporary").value = resp.data;
		});
		
		
        console.log(search);
    }

    return (
        <div className='search-bar'>
            <form onSubmit={submitSearch}>
                <input type='text' placeholder='search...' onChange={handleChange} id="temporary"></input>
            </form>
        </div>
    )
}

export default SearchBar;