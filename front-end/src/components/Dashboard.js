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
    const [showEdit, setEdit] = useState();
    const [businessArray, setbusinessArray] = useState([]);
    const [divArray, setdivArray] = useState([]);

    function getOwnedBusinesses() {
        var result = axios.get(REST_API_CALL, {
            params: {
                userID: authState.user.userId
            }
        }).then(resp => {
            if (typeof resp.data === "string") {
                setbusinessArray([]);
            }
            else { setbusinessArray(resp.data); }
        });
        console.log(result);
        return result;
    }

    const emptyBusiness = {
        name: "",
        rating: 0,
        description: "",
        startHour: '00:00',
        endHour: '23:00',
        business_type: '',
        reviewCount: 0,
        cost: 1,
        otherInfo: "",
        phone: '',
        website: '',
        email: '',
        address: ''
    }

    function openEditView(business) {
        console.log(business);
        business.startingTime = business.startHour;
        business.endingTime = business.endHour;
        business.category = business.business_type;
        business.phone = business.phone_number;
        business.priceLevel = business.cost
        if (business == emptyBusiness) {
            setAuthState(prevState => {
                return {
                    ...prevState, BusinessEdit: business, newBusiness: true
                }
            });
        }
        else {
            setAuthState(prevState => {
                return {
                    ...prevState, BusinessEdit: business, newBusiness: false
                }
            });
        }
        setEdit(business);
    }

    useEffect(() => {
        if (!authState.loggedIn) {
            window.location.replace('./')
        }
        getOwnedBusinesses();
        setAuthState(prevState => {
            return {
                ...prevState,
                uploadReady: false
            }
        })
    }, [showEdit, authState.uploadReady, authState.loggedIn])

    useEffect(() => {
        console.log(businessArray)
        if (businessArray.length > 0) {
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
                <Navbar /><br/>
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