import Navbar from './Navbar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext'
import BusinessPageHeaderEdit from './BusinessPageHeaderEdit'
import BusinessPageBottomEdit from './BusinessPageBottomEdit'
import Signup from './UserAuth/SignupPopup'

function outputBusinessPage(business, setEdit) {
    return (
        <div>
            <BusinessPageHeaderEdit name={business.name} startingTime={business.startHour} endingTime={business.endHour} givenCategory={business.business_type} rating={business.rating} reviewCount={business.reviewCount} priceLevel={business.cost} />
            <BusinessPageBottomEdit setEdit={setEdit} description={business.description} otherInfo={business.otherInfo} phone={business.phone_number} website={business.website} email={business.email} address={business.address} />
        </div>)
}

function BusinessPageEdit(props) {
    const { authState, setAuthState } = useContext(authContext);
    return (
        <div className='home'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {(authState.showLogin || authState.showSignup) ? <div className='darkened'></div> : null}
            <Navbar /><br/>
            {outputBusinessPage(props.business, props.setEdit)}
        </div>
    )
}

export default BusinessPageEdit;