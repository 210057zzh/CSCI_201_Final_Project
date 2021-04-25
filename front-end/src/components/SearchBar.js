import { useState } from 'react';
import '../css/SearchBar.css';
import axios from 'axios';

function SearchBar(props) {
    const [search, setSearch] = useState(props.default);
    const REST_API_CALL = 'http://localhost:8080/api/businesses'

    function handleChange(e) {
        setSearch(e.target.value);
    }

    function submitSearch(e) {
        e.preventDefault();
        axios.get(REST_API_CALL, {
            params: {
                search: search
            }
        }).then(resp => {
            if (typeof resp.data === "string") {
                props.setData([]);
            }
            else { props.setData(resp.data); }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='search-bar'>
            <form onSubmit={submitSearch} style={{ display: 'inline' }}>
                <input type='text' className='field' placeholder='search...' defaultValue={props.default} onChange={handleChange} id="temporary"></input>
                <input type='button' className='searchButton' value='filter' onClick={submitSearch}></input>
            </form>
        </div>
    )
}

export default SearchBar;