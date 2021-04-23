import { useContext, useState, useEffect } from 'react';
import { authContext } from './contexts/authContext';
import Navbar from './Navbar'
import StarRating from './StarRating.js';
import '../css/Dashboard.css'
import './MaxLengthString';
import MaxLengthString from './MaxLengthString';
import BusinessPageEdit from './BusinessPageEdit'
import axios from 'axios';

// Placeholder values, in the future grab by user Id or name



function Dashboard(props) {
    const REST_API_CALL = 'http://localhost:8080/api/myBusinesses'
    const { authState, setAuthState } = useContext(authContext);
    const [ownedBusinesses, setOwnedBusinesses] = useState();
    const [showEdit, setEdit] = useState();
    const [businessArray, setbusinessArray] = useState([]);
    const [divArray, setdivArray] = useState([]);

    async function getOwnedBusinesses() {
        var result = await axios.get(REST_API_CALL, {
            params: {
                userID: authState.user.userID
            }
        });
        return result;
    }

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
        console.log(businessArray);
    }, [showEdit])

    useEffect(() => {
        if (businessArray.length >= 0) {
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
        }
        else {
            setdivArray([]);
        }
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