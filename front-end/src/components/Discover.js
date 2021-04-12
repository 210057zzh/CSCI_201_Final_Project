import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useState } from 'react';
import DiscoverSnippet from './DiscoverSnippet'
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext';

function Discover(props) {
    const {authState, setAuthState} = useContext(authContext);
    const REST_API_CALL = 'http://localhost:8080/api/discover'
    const [data, setData] = useState([]);

    useEffect(async () => {
        var category = "";
        const result = await axios.get(REST_API_CALL, {
            params: {
                category: category
            }
        });
        setData(result.data)
    }, [])

    return (
        <div className='discover'>
            {authState.showLogin ? <Login/> : null}
            {authState.showLogin ? <div className='darkened' ></div> : null}
            <Navbar/>
            <div className='home-search'>
                <div style={{ paddingTop: "1px" }}></div>
                <SearchBar />
                <div style={{ paddingTop: "2vh" }}></div>
                {
                    //TODO make it so all of the info is actually displaying (just naming differences between this and db and # of reviews needs to be added to db)
                    data.map(business =>
                        <DiscoverSnippet businessName={business.name} rating={business.average_rating} reviewCount={business.numReviews} phoneNumber={business.phone_number} address={business.address} description={business.description} />
                    )
                }
            </div>
        </div>

    )
}

export default Discover;