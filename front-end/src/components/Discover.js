import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useState } from 'react';
import DiscoverSnippet from './DiscoverSnippet'
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext';
import Signup from './UserAuth/SignupPopup';
import { useMediaQuery } from 'react-responsive';

function Discover(props) {
    const { authState, setAuthState } = useContext(authContext);
    const REST_API_CALL = 'http://localhost:8080/api/businesses'
    const [data, setData] = useState([]);
    const [divArray, setDiv] = useState([]);
    const smallDevice = useMediaQuery({ minWidth: 1050});
    const value =
        (props.location && props.location.default) || "";

    useEffect(async () => {
        const result = await axios.get(REST_API_CALL, {
            params: {
                search: value
            }
        });
        setData(result.data)
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            setDiv(data.map(business =>
                <DiscoverSnippet businessID={business.businessID} businessName={business.name} rating={business.average_rating} reviewCount={business.review_count} phoneNumber={business.phone_number} address={business.address} description={business.description} />
            ));
        }
        else {
            setDiv([]);
        }
    }, [data, authState])

    return (
        <div className='discover'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {(authState.showLogin || authState.showSignup) ? <div className='darkened'></div> : null}
            <Navbar />
            <div className='home-search'>
                <div style={{ paddingTop: "1px" }}></div>
                <div style={{marginTop: (smallDevice ? '0em' : '5em')}}>
                    <SearchBar setData={setData} default={value} />
                </div>
                <div style={{ paddingTop: "2vh" }}></div>
                {
                    divArray
                }
            </div>
        </div>

    )
}

export default Discover;