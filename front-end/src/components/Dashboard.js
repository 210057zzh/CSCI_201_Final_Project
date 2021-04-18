import { useContext , useState, useEffect } from 'react';
import { authContext } from './contexts/authContext';
import Navbar from './Navbar'
import StarRating from './StarRating.js';
import '../css/Dashboard.css'
import './MaxLengthString';
import MaxLengthString from './MaxLengthString';

// Placeholder values, in the future grab by user Id or name
function getOwnedBusinesses() {
    return([
        {
            name: "Bob's Plumbing Services",
            rating: 4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        },
        {
            name: "Dale's Plumbing Services",
            rating: 5,
            description: "This is Dale's plumbing services ad description. Blah blah blah."
        },
        {
            name: "Jim's Plumbing Services",
            rating: 1,
            description: "This is Jim's plumbing services ad description. Blah blah blah."
        }
    ])
}


function Dashboard(props) {
    const {authState, setAuthState} = useContext(authContext);
    const [ownedBusinesses, setOwnedBusinesses] = useState();
    
    useEffect(() => {
        if(!authState.loggedIn) {
            window.location.replace('./')
        }
    }, [])
    
    function ownedBusinessesToDom() {
        let businessArray = getOwnedBusinesses();
        businessArray = businessArray.map(business => {
            return(
                <div class='business-card'>
                    <div class='business-name'>{business.name}</div>
                    <StarRating value={business.rating}></StarRating>
                    <MaxLengthString text={business.description} maxLength={300}></MaxLengthString>
                    <input className='edit-button' type='button' value='Edit'></input>
                </div>
            )
        });
        return businessArray;
    }
    
    return(
        <div>
            <Navbar/>
            <div className='my-businesses'>
                <div className='my-businesses-title'>My Businesses</div>
                <div className='my-businesses-container'>
                    {ownedBusinessesToDom()}
                    <div className='business-card'> {/** Link this card to the edit page */}
                        <div className='add-new'>Add a new business</div>
                        <div className='plus'>+</div> 
                        </div>
                    </div>
                </div>
 
            <div className='my-favorites'>

            </div>
        </div>
    )

}
export default Dashboard;