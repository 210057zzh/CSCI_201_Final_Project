import '../css/BusinessPage.css';
import { useState, useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext';
import Pencil from '../css/img/pencil.png';
import YelpLogo from '../css/img/pencil.png';
import { validateBusinessEdit } from './UserAuth/validate';
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive'

function parseText(text) {
    let myString = text.split('\\n').map(function (item, idx) {
        return <span key={idx}>
            {item}
            <br />
        </span>
    })
    return myString;
}

function BusinessPageBottomEdit({ description, otherInfo, phone, website, email, address, setEdit }) {
    const isSmallDevice = useMediaQuery({ minWidth: 900 });
    const { authState, setAuthState } = useContext(authContext);
    const REST_API_CALL_ADD = 'http://localhost:8080/api/addBusiness'
    const REST_API_CALL_UPDATE = 'http://localhost:8080/api/updateBusiness'
    const REST_API_CALL_YELP = 'http://localhost:8080/api/yelpfill'
    let value = null;

    async function addBusiness(business) {
        const result = await axios.get(REST_API_CALL_ADD, {
            params: {
                userID: authState.user.userId,
                business_type: business.category,
                name: business.name,
                otherInfo: business.otherInfo,
                email: business.email,
                website: business.website,
                phone_number: business.phone,
                startHour: business.startingTime,
                endHour: business.endingTime,
                description: business.description,
                cost: business.priceLevel,
                address: business.address
            }
        }).then(resp => {
            console.log(resp);
            setAuthState(prevState => {
                return {
                    ...prevState,
                    uploadReady: true
                }
            })
        })
    }

    async function updateBusiness(business) {
        const result = await axios.get(REST_API_CALL_UPDATE, {
            params: {
                userID: authState.user.userId,
                category: business.category,
                name: business.name,
                otherInfo: business.otherInfo,
                email: business.email,
                website: business.website,
                phone_number: business.phone,
                startHour: business.startingTime,
                endHour: business.endingTime,
                description: business.description,
                cost: business.priceLevel,
                address: business.address,
                businessID: business.businessID
            }
        }).then(resp => {
            console.log(resp);
            setAuthState(prevState => {
                return {
                    ...prevState,
                    uploadReady: true
                }
            })
        })
    }



    function updateDescription(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    description: e.target.value
                }
            }
        })

    }

    function updateOtherInfo(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    otherInfo: e.target.value
                }
            }
        });
    }

    function updatePhone(e) {
        value = e;
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    phone: e
                }
            }
        });
    }

    function updateWebsite(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    website: e.target.value
                }
            }
        });

    }

    function updateEmail(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    email: e.target.value
                }
            }
        });
    }

    function updateAddress(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    address: e.target.value
                }
            }
        });
    }

    function importYelp() {
        axios.get(REST_API_CALL_YELP, {
            params: {
                name: authState.BusinessEdit.name,
                address: authState.BusinessEdit.address
            }
        }).then(res => {
            console.log(res);
        })
    }

    function submit(e) {
        var result = validateBusinessEdit(authState.BusinessEdit);
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEditErrs: result.errors,
            }
        });
        if (result.success === true) {
            console.log(authState.BusinessEdit);
            if (authState.newBusiness === true) {
                addBusiness(authState.BusinessEdit);
            }
            else {
                updateBusiness(authState.BusinessEdit);
            }
            setEdit(null);
        }
    }

    function back(e) {
        setEdit(null);
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEditErrs: {}
            }
        });
    }

    return (
        <div className='bottomBackground' style={{ padding: '0 2vh 2vh 2vh', marginTop: '0' }}>

            <div style={{ marginLeft: '1em', marginRight: 'auto', overflowX: 'hidden' }}>
                <div style={{ textAlign: 'left' }}>
                    <input className='button' type='button' value='Save' onClick={submit}></input>
                    <input className='button' type='button' value='Back' onClick={back}></input> {!isSmallDevice && <br/>}
                    <input className='importButton' type='button' value='Import From' onClick={importYelp}></input>
                </div>
                <hr className='line' style={{ width: '80em', marginTop: '1.5em' }} /><br /><br />

                <div className="businessData" style={{justifyContent: 'space-between'}}>
                    <div className="businessInfoSection">
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                                <p className='fieldEditText' style={{ paddingLeft: '0px' }}>Business Description</p>
                                <img src={Pencil} className="pencil"></img><br />
                            </div>
                            <TextField multiline
                                variant="outlined"
                                error={authState.BusinessEditErrs.description}
                                helperText={authState.BusinessEditErrs.description ? authState.BusinessEditErrs.description : ''}
                                rows={5}
                                rowsMax={5} className='textUpdate' onChange={updateDescription}
                                defaultValue={description.replaceAll("\\n", '\r')} />
                            <br />
                            <div style={{ display: 'inline',whiteSpace: 'nowrap' }}>
                                <p className='fieldEditText' style={{ paddingLeft: '0px', marginTop: '8px' }}>Other Information</p>
                                <img src={Pencil} className="pencil" style={{ marginTop: '8px' }}></img><br />
                            </div>
                            <TextField multiline
                                variant="outlined"
                                rows={5}
                                rowsMax={5} className='textUpdate'
                                error={authState.BusinessEditErrs.otherInfo}
                                helperText={authState.BusinessEditErrs.otherInfo ? authState.BusinessEditErrs.otherInfo : ''}
                                onChange={updateOtherInfo} defaultValue={otherInfo.replaceAll("\\n", '\r')} />
                        </div>
                    </div>
                    <div className="contactSection">
                        <div style={{ margin: '1em 1em 0 0', padding: '0 1em 0 1em', border: 'solid', borderRadius: '10px', borderWidth: '1px' }}>
                            <div style={{ display: 'inline' }}>
                                <div style={{textAlign: (isSmallDevice ? 'center' : 'left')}}>
                                    <p className='fieldEditText'>Contact</p>
                                    <img src={Pencil} className="pencil" style={{ marginTop: '7px' }} id="magicPencil"></img><br />
                                </div>
                            </div>
                            <hr className='contactLine' />
                            <div className='contactBlue' style={{ textAlign: 'left' }}>
                                <div style={{ margin: '1em' }}>
                                    <MuiPhoneNumber
                                        onlyCountries={["us"]}
                                        disableCountryCode
                                        value={phone}
                                        label="phone"
                                        error={authState.BusinessEditErrs.phone}
                                        helperText={authState.BusinessEditErrs.phone ? authState.BusinessEditErrs.phone : ''}
                                        defaultCountry={'us'} onChange={updatePhone} />
                                </div>
                                <hr className='contactLine' />
                                <div style={{ margin: '1em' }}>
                                    <TextField style={{ width: '100%' }} type='text'
                                        label="website" name='website' className='contactInput'
                                        error={authState.BusinessEditErrs.website}
                                        helperText={authState.BusinessEditErrs.website ? authState.BusinessEditErrs.website : ''}
                                        defaultValue={website} onChange={updateWebsite} />
                                </div>
                                <hr className='contactLine' />
                                <div style={{ margin: '1em' }}>
                                    <TextField style={{ width: '100%' }} type='text'
                                        error={authState.BusinessEditErrs.email}
                                        helperText={authState.BusinessEditErrs.email ? authState.BusinessEditErrs.email : ''}
                                        label="email" className='contactInput' defaultValue={email} onChange={updateEmail} />
                                </div>
                                <hr className='contactLine' />
                                <div style={{ margin: '1em' }}>
                                    <TextField style={{ width: '100%' }}
                                        type='text' label="address" name='address'
                                        error={authState.BusinessEditErrs.address}
                                        helperText={authState.BusinessEditErrs.address ? authState.BusinessEditErrs.address : ''}
                                        className='contactInput' defaultValue={address} onChange={updateAddress} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BusinessPageBottomEdit;