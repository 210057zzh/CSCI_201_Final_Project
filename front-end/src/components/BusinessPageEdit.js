import Navbar from './Navbar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useState, useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext'
import BusinessPageHeaderEdit from './BusinessPageHeaderEdit'
import BusinessPageBottomEdit from './BusinessPageBottomEdit'
import Signup from './UserAuth/SignupPopup'
import { Redirect } from "react-router-dom";

function getBusinessInfo() {
    return (
        {
            name: "Bob's Plumbing Service",
            startingTime: '08:00',
            endingTime: '07:00',
            category: 'Plumbing',
            rating: 4,
            reviewCount: 24,
            priceLevel: 5,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            otherInfo: "Pricing: 100$ \\nAccepting All customers! test \\nServicing only within 25 miles of L.A.",
            phone: '(123) 456-7891',
            website: 'bobsplumbing.com',
            email: 'bobplumb@gmail.com',
            address: '1234 Fake Street, Los Angeles',
        }
    )
}

function outputBusinessPage(business) {

    return (
        <div>
            <BusinessPageHeaderEdit name={business.name} startingTime={business.startingTime} endingTime={business.endingTime} givenCategory={business.category} rating={business.rating} reviewCount={business.reviewCount} priceLevel={business.priceLevel} />
            <BusinessPageBottomEdit description={business.description} otherInfo={business.otherInfo} phone={business.phone} website={business.website} email={business.email} address={business.address} />
        </div>)
}

let business = getBusinessInfo();
function BusinessPageEdit(props) {
    const { authState, setAuthState } = useContext(authContext);
    useEffect(() => {
        if (authState.editing === false) {
            setAuthState(prevState => {
                return {
                    ...prevState, editing: true, BusinessEdit: business
                }
            });
        }
    });
    // if (authState.BusinessEditRedirect === true) {
    //     setAuthState(prevState => {
    //         return {
    //             ...prevState, editing: false, BusinessEdit: {}
    //         }
    //     });
    //     return <Redirect to={"/"} />
    // }
    return (
        <div className='home'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {(authState.showLogin || authState.showSignup) ? <div className='darkened'></div> : null}
            <Navbar />
            {outputBusinessPage(business)}
        </div>
    )
}

export default BusinessPageEdit;