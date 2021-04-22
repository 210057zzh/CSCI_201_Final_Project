import Navbar from './Navbar';
import axios from 'axios';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useState, useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext'
import BusinessPageHeader from './BusinessPageHeader'
import BusinessPageBottom from './BusinessPageBottom.js'
import Signup from './UserAuth/SignupPopup';

function BusinessPage(props) {
    const { authState } = useContext(authContext);
    const [business, setBusiness] = useState();

    useEffect(() => {
        const businessName = props.match.params.businessName;
        axios.get('http://localhost:8080/api/business?name=' + businessName).then(res => {
            console.log(res);
            setBusiness ({
                businessID: res.data[0].businessId,
                name: res.data.name,
                rating: res.data.average_rating,
                startingTime: res.data.startHour,
                endingTime: res.data.endHour,
                category: res.data.business_type,
                reviewCount: res.data.numReviews,
                priceLevel: res.data.cost,
                description: res.data.description,
                address: res.data.address,
                phone: res.data.phone_number,
                otherInfo: 'still need from backend',
                website: 'still need from backend',
                email: 'still need from backend'
            })
        })
    }, [])

    return (
        <div className='home'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {(authState.showLogin || authState.showSignup) ? <div className='darkened'></div> : null}
            <Navbar />
            {business ? <div>
                <BusinessPageHeader name={business.name} startingTime={business.startingTime} endingTime={business.endingTime} category={business.category} rating={business.rating} reviewCount={business.reviewCount} priceLevel={business.priceLevel} />
                <BusinessPageBottom  description={business.description} otherInfo={business.otherInfo} phone={business.phone} website={business.website} email={business.email} address={business.address}/>
            </div> : null }
        </div>
    )
}

export default BusinessPage;