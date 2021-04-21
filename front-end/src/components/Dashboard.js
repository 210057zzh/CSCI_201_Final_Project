import { useContext, useState, useEffect } from 'react';
import { authContext } from './contexts/authContext';
import Navbar from './Navbar'
import StarRating from './StarRating.js';
import '../css/Dashboard.css'
import './MaxLengthString';
import MaxLengthString from './MaxLengthString';
import BusinessPageEdit from './BusinessPageEdit'

// Placeholder values, in the future grab by user Id or name
function getOwnedBusinesses() {
    return ([
        {
            name: "Bob's Plumbing Service",
            startingTime: '01:00',
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
            address: '1234 Fake Street, Los Angeles'
        },
        {
            name: "Dale's Plumbing Services",
            rating: 5,
            description: "This is Dale's plumbing services ad description. Blah blah blah.",
            startingTime: '01:00',
            endingTime: '07:00',
            category: 'Plumbing',
            reviewCount: 24,
            priceLevel: 5,
            otherInfo: "Pricing: 100$ \\nAccepting All customers! test \\nServicing only within 25 miles of L.A.",
            phone: '(123) 456-7891',
            website: 'bobsplumbing.com',
            email: 'bobplumb@gmail.com',
            address: '1234 Fake Street, Los Angeles'
        },
        {
            name: "Jim's Plumbing Services",
            rating: 1,
            description: "This is Jim's plumbing services ad description. Blah blah blah.",
            startingTime: '01:00',
            endingTime: '07:00',
            category: 'Plumbing',
            reviewCount: 24,
            priceLevel: 5,
            otherInfo: "Pricing: 100$ \\nAccepting All customers! test \\nServicing only within 25 miles of L.A.",
            phone: '(123) 456-7891',
            website: 'bobsplumbing.com',
            email: 'bobplumb@gmail.com',
            address: '1234 Fake Street, Los Angeles'
        }
    ])
}


function Dashboard(props) {
    const { authState, setAuthState } = useContext(authContext);
    const [ownedBusinesses, setOwnedBusinesses] = useState();
    const [showEdit, setEdit] = useState();
    const [businessArray, setbusinessArray] = useState([]);
    const [divArray, setdivArray] = useState([]);

    const emptyBusiness = {
        name: "",
        rating: 0,
        description: "",
        startingTime: '00:00',
        endingTime: '23:00',
        category: '',
        reviewCount: 0,
        priceLevel: 1,
        otherInfo: "",
        phone: '',
        website: '',
        email: '',
        address: ''
    }

    function openEditView(business) {
        setAuthState(prevState => {
            return {
                ...prevState, BusinessEdit: business
            }
        });
        setEdit(business);
    }

    useEffect(() => {
        //     if(!authState.loggedIn) {
        //         window.location.replace('./')
        //     }
        setbusinessArray(getOwnedBusinesses());
    }, [])

    useEffect(() => {
        setdivArray(businessArray.map(business => {
            return (
                <div class='business-card'>
                    <div class='business-name' >{business.name}</div>
                    <StarRating value={business.rating}></StarRating>
                    <MaxLengthString text={business.description} maxLength={300}></MaxLengthString>
                    <input className='edit-button' type='button' value='Edit' onClick={() => {
                        openEditView(business)
                    }}></input>
                </div>
            )
        }))
    }, [businessArray])

    if (!showEdit) {
        return (
            <div>
                <Navbar />
                <div className='my-businesses'>
                    <div className='my-businesses-title'>My Businesses</div>
                    <div className='my-businesses-container'>
                        {divArray}
                        <div className='business-card' >
                            <div className='add-new'>Add a new business</div>
                            <div className='plus' onClick={() => {
                                openEditView(emptyBusiness);
                            }}>+</div>
                        </div>
                    </div>
                </div>

                <div className='my-favorites'>

                </div>
            </div>
        )
    }
    else {
        return (
            <BusinessPageEdit business={showEdit} setEdit={setEdit} />
        )
    }

}
export default Dashboard;