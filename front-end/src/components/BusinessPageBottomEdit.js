import '../css/BusinessPage.css';
import { useState } from 'react';

import ReviewSnippet from './ReviewSnippet';
import Pencil from '../css/img/pencil.png';
import YelpLogo from '../css/img/pencil.png';

function getReviews() {

    return (
        [
            {
                username: "Mary Jane",
                rating: 4,
                reviewCount: 4,
                reviewMessage: "Absolutely stellar service!  I would recommend Bob to anyone who needs to fix their plumbing issues.  Only drawback is the price... but a fine job is guaranteed!"
            },
            {
                username: "Mary Jane",
                rating: 4,
                reviewCount: 4,
                reviewMessage: "Absolutely stellar service!  I would recommend Bob to anyone who needs to fix their plumbing issues.  Only drawback is the price... but a fine job is guaranteed!"
            }
        ]
    )
}

function parseText(text) {
    let myString = text.split('\\n').map(function (item, idx) {
        return <span key={idx}>
            {item}
            <br />
        </span>
    })
    return myString;

}

function BusinessPageBottomEdit({ description, otherInfo, phone, website, email, address }) {

    const [editDescription, setDescription] = useState('');
    const [editOtherInfo, setOtherInfo] = useState('');
    const [editPhone, setPhone] = useState('');
    const [editWebsite, setWebsite] = useState('');
    const [editEmail, setEmail] = useState('');
    const [editAddress, setAddress] = useState('');

    function updateDescription(e) {
        setDescription(e.getTarget.value);
    }

    function updateOtherInfo(e) {
        setOtherInfo(e.getTarget.value);
    }

    function updatePhone(e) {
        setPhone(e.getTarget.value);
    }

    function updateWebsite(e) {
        setWebsite(e.target.value);
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updateAddress(e) {
        setAddress(e.target.value);
    }

    function importYelp() {
        alert('Updating From Yelp!!');
    }





    return (
        <div className='bottomBackground' style={{ padding: '0 2vh 2vh 2vh', marginTop: '0' }}>

            <div style={{ marginLeft: '1em', marginRight: 'auto', overflowX: 'hidden' }}>
                <div style={{ textAlign: 'left' }}>
                    <input className='button' type='button' value='Review'></input>
                    <input className='button' type='button' value='Favorite'></input>
                    <input className='importButton' type='button' value='Import From' onClick={importYelp}></input>
                </div>
                <hr className='line' style={{ width: '80em', marginTop: '1.5em' }} /><br /><br />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ float: 'left', width: '75%' }}>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ display: 'inline' }}>
                                <p className='fieldEditText' style={{ paddingLeft: '0px' }}>Business Description</p>
                                <img src={Pencil} className="pencil"></img><br />
                            </div>
                            <textarea className='textUpdate' onChange={updateDescription}>{description.replaceAll("\\n", '\r')}</textarea>


                            <br />
                            <div style={{ display: 'inline' }}>
                                <p className='fieldEditText' style={{ paddingLeft: '0px', marginTop: '8px' }}>Other Information</p>
                                <img src={Pencil} className="pencil" style={{ marginTop: '8px' }}></img><br />

                            </div>
                            <textarea className='textUpdate' onChange={updateOtherInfo}>{otherInfo.replaceAll("\\n", '\r')}</textarea>
                        </div>
                    </div>

                    <div style={{ float: 'right', display: 'justify-content', verticalAlign: 'top', marginLeft: '10px', marginRight: '1em' }}>

                        <div style={{ margin: '1em 1em 0 0', padding: '0 1em 0 1em', border: 'solid', borderRadius: '10px', borderWidth: '1px' }}>

                            <div style={{ display: 'inline' }}>
                                <p className='fieldEditText'>Contact</p>
                                <img src={Pencil} className="pencil" style={{ marginTop: '7px' }}></img><br />
                            </div>
                            <hr className='contactLine' />
                            <div className='contactBlue' style={{ textAlign: 'left' }}>
                                <div style={{ display: 'inline-block' }}>
                                    <label for='phone'>Phone: </label>
                                    <input type='tel' name='phone' className='contactInput' pattern=".([0-9]{3}.) [0-9]{3}-[0-9]{4}" defaultValue={phone} onChange={updatePhone}></input><br />
                                </div>
                                <hr className='contactLine' />
                                <div style={{ display: 'inline-block' }}>
                                    <label for='phone'>Website: </label>
                                    <input type='text' name='website' className='contactInput' pattern="^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$" defaultValue={website} style={{ width: '65%' }} onChange={updateWebsite}></input><br />
                                </div>
                                <hr className='contactLine' />
                                <div style={{ display: 'inline-block' }}>
                                    <label for='phone'>Email: </label>
                                    <input type='email' name='email' className='contactInput' defaultValue={email} onChange={updateEmail}></input><br />
                                </div>
                                <hr className='contactLine' />
                                <div style={{ display: 'inline-block' }}>
                                    <label for='phone' style={{ color: 'black' }}>Address: </label>
                                    <input type='text' name='address' className='contactInput' defaultValue={address} style={{ color: 'black', width: '65%' }} onChange={updateAddress}></input><br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>

                    <hr className='line' style={{ width: '95%' }} /><br />
                    <p className='subText' style={{ textAlign: 'left', marginTop: '20px' }}>Reviews</p>
                    {
                        getReviews().map(review =>
                            <div>
                                <ReviewSnippet username={review.username} rating={review.rating} reviewCount={review.reviewCount} reviewMessage={review.reviewMessage} />
                                <hr className='reviewLine' /><br />
                            </div>
                        )

                    }
                </div>

                <div className="pageSection">
                    <a href="#" className="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                </div>
            </div>
        </div>


    )

}


export default BusinessPageBottomEdit;