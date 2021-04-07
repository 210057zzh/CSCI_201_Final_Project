import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useState } from 'react';
import DiscoverSnippet from './DiscoverSnippet'
import axios from 'axios';

function Discover(props) {
    const [showLogin, setShowLogin] = useState(false);

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

    function getData() {
        return (
            [
                {
                    businessName: "Bob's Plumbing Services",
                    rating: 4,
                    reviewCount: 24,
                    phoneNumber: '(123) 456-7891',
                    address: '1234 Fake Street',
                    description: "This is Bob’s plumbing services ad description. I offer the best plumbing in town. I have a 4-star rated service on Sprout and 24 reviews. service on Sprout and 24 reviews. Contact me at the listed phone number of at my address. Although I am already done with my description, I am going to keep writing. you will see how it will not go past the second line even if I keep writing. Look!. I'll start to count to 15. One, two, three, four, five six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen!"
                },
                {
                    businessName: "Dale's Plumbing Services",
                    rating: 5,
                    reviewCount: 44,
                    phoneNumber: '(123) 123-4566',
                    address: '5678 Fake Street',
                    description: "This is Dale’s plumbing services ad description.  I offer better phlumbing than Bob.  I have a 5-star rated service on Sprout and 44 reviews.  Contact me at the phone number"
                },
                {
                    businessName: "Jim's Plumbing Services",
                    rating: 1,
                    reviewCount: 36,
                    phoneNumber: '(123) 456-8234',
                    address: '9876 Fake Street',
                    description: "This is Jim’s plumbing services ad description.  I offer the worst plumbing in town.  I have a 1-star rated service on Sprout and 24 reviews.  Contact me at the phone number."
                }
            ]


        )
    }

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
                    getData().map(business =>
                        <DiscoverSnippet businessName={business.businessName} rating={business.rating} reviewCount={business.reviewCount} phoneNumber={business.phoneNumber} address={business.address} description={business.description} />
                    )
                }
            </div>
            <div className={showLogin ? 'darkened lower' : 'lower'} onClick={toggleLoginOff}>
            </div>
        </div>

    )
}

export default Discover;