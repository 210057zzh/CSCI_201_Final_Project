import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { Component, useState } from 'react';
import DiscoverSnippet from './DiscoverSnippet'
import axios from 'axios';
import { useEffect } from 'react';

function Discover(props) {
    const [showLogin, setShowLogin] = useState(false);
    const REST_API_CALL = 'http://localhost:8080/api/discover' 
    const [data, setData] = useState([]);

    function toggleLoginOn() {
        setShowLogin(true);
    }
    function toggleLoginOff(e) {
        setShowLogin(false);
    }
    function toggleLoginStatusOn() {
        if (props.toggleLoginStatusOn)
            props.toggleLoginStatusOn();
    }
    function toggleLoginStatusOff() {
        if (props.toggleLoginStatusOff)
            props.toggleLoginStatusOff();
    }

    useEffect(async() =>{
        var category="";
        const result = await axios.get(REST_API_CALL, {
            params: {
                category: category
            }
        });
        setData(result.data)
    }, [])

    return (
        <div className='discover'>
            {showLogin ? <Login LoginStatus={props.LoginStatus} toggleLoginStatusOn={toggleLoginStatusOn} toggleLoginStatusOff={toggleLoginStatusOff} LoginbyGoogle={props.LoginbyGoogle} setLoginbyGoogle={props.setLoginbyGoogle} /> : null}
            <Navbar toggleLoginOn={toggleLoginOn}
                toggleLoginOff={toggleLoginOff}
                className={showLogin ? 'darkened' : ''}
                showLogin={showLogin}
                LoginStatus={props.LoginStatus}
                toggleLoginStatusOn={toggleLoginStatusOn}
                toggleLoginStatusOff={toggleLoginStatusOff} />
            <div className={showLogin ? 'darkened home-search' : 'home-search'} onClick={toggleLoginOff}>
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
            <div className={showLogin ? 'darkened lower' : 'lower'} onClick={toggleLoginOff}>
            </div>
        </div>

    )
}

export default Discover;