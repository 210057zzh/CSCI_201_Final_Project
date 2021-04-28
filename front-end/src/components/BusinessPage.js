import Navbar from './Navbar';
import axios from 'axios';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useState, useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext'
import BusinessPageHeader from './BusinessPageHeader'
import BusinessPageBottom from './BusinessPageBottom.js'
import Signup from './UserAuth/SignupPopup';
import Review from './ReviewPopup';

function BusinessPage(props) {
    const { authState, setAuthState } = useContext(authContext);
    const [business, setBusiness] = useState();

    useEffect(() => {
        const businessID = props.match.params.businessID;
        axios.get('http://sprout-env.eba-vmpmw53n.us-west-1.elasticbeanstalk.com//api/businessInfo?businessID=' + businessID).then(res => {
            console.log(res);
            setBusiness({
                name: res.data[0].name,
                rating: res.data[0].average_rating,
                startingTime: res.data[0].startHour,
                endingTime: res.data[0].endHour,
                category: res.data[0].business_type,
                reviewCount: res.data[0].review_count,
                priceLevel: res.data[0].cost,
                description: res.data[0].description,
                address: res.data[0].address,
                phone: res.data[0].phone_number,
                otherInfo: res.data[0].otherInfo,
                website: res.data[0].website,
                email: res.data[0].email
            })
        })

        setAuthState(prevState => {
            return {
                ...prevState,
                uploadReady: false
            }
        })

    }, [authState.showReview, authState.uploadReady])

    return (
        <div className='home'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {authState.showReview ? <Review /> : null}
            {(authState.showLogin || authState.showSignup || authState.showReview) ? <div className='darkened'></div> : null}
            <Navbar /><br />
            {business ? <div>
                <BusinessPageHeader name={business.name} startingTime={business.startingTime} endingTime={business.endingTime} category={business.category} rating={business.rating} reviewCount={business.reviewCount} priceLevel={business.priceLevel} />
                <BusinessPageBottom currBusinessID={props.match.params.businessID} description={business.description} otherInfo={business.otherInfo} phone={business.phone} website={business.website} email={business.email} address={business.address} />
            </div> : null}
        </div>
    )
}

export default BusinessPage;