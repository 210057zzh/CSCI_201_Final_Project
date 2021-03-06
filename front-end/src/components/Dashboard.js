import { useContext, useState, useEffect } from 'react';
import { authContext } from './contexts/authContext';
import Navbar from './Navbar'
import StarRating from './StarRating.js';
import '../css/Dashboard.css'
import './MaxLengthString';
import MaxLengthString from './MaxLengthString';
import BusinessPageEdit from './BusinessPageEdit'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// Placeholder values, in the future grab by user Id or name



function Dashboard(props) {
    const REST_API_CALL = 'http://localhost:8080/api/myBusinesses'
    const REST_API_CALL_ALL_FAVORITES = "http://localhost:8080/api/getUserFavorites";
    const REST_API_UNFAVORITE = 'http://localhost:8080/api/removeFavorite';
    const { authState, setAuthState } = useContext(authContext);
    const [showEdit, setEdit] = useState();
    const [businessArray, setbusinessArray] = useState([]);
    const [favoritesArray, setfavoritesArray] = useState([]);
    const [divArray, setdivArray] = useState([]);
    const [divArray2, setdivArray2] = useState([]);

    function getAllFavorites() {
        var result = axios.get(REST_API_CALL_ALL_FAVORITES, {
            params: {
                userID: authState.user.userId
            }
        }).then(resp => {
            if (typeof resp.data === "string") {
                setfavoritesArray([]);
            }
            else { setfavoritesArray(resp.data); }
        });
        return result;
    }


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

    function unfavorite(businessID) {
        axios.post(REST_API_UNFAVORITE + "?businessID=" + businessID + "&userID=" + authState.user.userId).then(resp => {
        }).catch(function () {
            console.log('error');
        })
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
        getAllFavorites();
        getOwnedBusinesses();
        setAuthState(prevState => {
            return {
                ...prevState,
                uploadReady: false
            }
        })
    }, [showEdit, authState.uploadReady, authState.loggedIn])

    useEffect(() => {
        if (businessArray.length > 0) {
            setdivArray(businessArray.map(business => {
                return (
                    <div className='business-card'>
                        <div className='business-name' >{business.name}</div>
                        <div className='stars'><StarRating value={business.average_rating}></StarRating></div>
                        
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

    useEffect(() => {
        if (favoritesArray.length > 0) {
            setdivArray2(favoritesArray.map(business => {
                return (
                    <NavLink to={'../businesspage/' + business.businessID} style={{textDecoration: 'none', color: 'black'}}>
                    <div className='business-card'>
                        <div className='business-name' >{business.name}</div>
                        <div className='stars'><StarRating value={business.average_rating}></StarRating></div>
                        <MaxLengthString text={business.description} maxLength={300}></MaxLengthString>
                    </div>
                    </NavLink>
                )
            }))
        }
        else {
            setdivArray2(
                <div className='business-card'>
                <div className='business-name' >No Favorites Yet</div>

            </div>
            );
        }
    }, [favoritesArray])

    if (!showEdit) {
        return (
            <div>
                <Navbar /><br/>
                <div className='my-businesses'>
                    <div className='my-businesses-title'>My Businesses</div>
                    <div className='my-businesses-container'>
                        {divArray}
                        <div className='business-card add' onClick={() => {
                                openEditView(emptyBusiness);
                            }}>
                            <div className='add-new'>Add a new business</div>
                            <div className='plus'>+</div>
                        </div>
                    </div>
                </div>

                <div className='my-businesses'>
                    <div className='my-businesses-title'>My Favorites</div>
                    <div className='my-businesses-container'>
                        {divArray2}
                        </div>
                    </div>

                </div>
        )
    }
    else {
        return (
            <BusinessPageEdit business={authState.BusinessEdit} setEdit={setEdit} />
        )
    }

}
export default Dashboard;