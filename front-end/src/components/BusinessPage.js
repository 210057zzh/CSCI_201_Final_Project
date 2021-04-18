import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Login from './UserAuth/LoginPopup';
import '../css/Home.css';
import { useContext } from 'react';
import { authContext } from './contexts/authContext'
import BusinessPageHeader from './BusinessPageHeader'
import BusinessPageBottom from './BusinessPageBottom.js'
import Signup from './UserAuth/SignupPopup';

function getBusinessInfo() {
    return (
        {
            name: "Bob's Plumbing Service",
            startingTime: '08:00',
            endingTime: '17:00',
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

function outputBusinessPage() {
    let business = getBusinessInfo();
    return (
        <div>
            <BusinessPageHeader name={business.name} startingTime={business.startingTime} endingTime={business.endingTime} category={business.category} rating={business.rating} reviewCount={business.reviewCount} priceLevel={business.priceLevel} />
            <BusinessPageBottom  description={business.description} otherInfo={business.otherInfo} phone={business.phone} website={business.website} email={business.email} address={business.address}/>
        </div>)

}

function BusinessPage(props) {
    const { authState } = useContext(authContext);
    const businessName = props.match.params.businessName; //Grabs businessName from the URL, use this name to fetch business details from database.

    return (
        <div className='home'>
            {authState.showLogin ? <Login /> : null}
            {authState.showSignup ? <Signup /> : null}
            {(authState.showLogin || authState.showSignup) ? <div className='darkened'></div> : null}
            <Navbar />
            {outputBusinessPage()}
        </div>
    )
}

export default BusinessPage;