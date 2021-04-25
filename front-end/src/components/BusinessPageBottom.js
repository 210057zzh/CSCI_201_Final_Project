import '../css/BusinessPage.css';
import axios from 'axios';
import ReviewSnippet from './ReviewSnippet';
import { useState, useContext, useEffect } from 'react';
import { authContext } from './contexts/authContext'


function parseText(text) {
    let myString = text.split('\\n').map(function (item, idx) {
        return <span key={idx}>
            {item}
            <br />
        </span>
    })
    return myString;

}

function BusinessPageBottom({ currBusinessID, description, otherInfo, phone, website, email, address }) {
    const { authState, setAuthState } = useContext(authContext);
    const [currPage, setPage] = useState('');
    const [ reviews, setReviews ] = useState();
    const REST_API_GET_REVIEWS = 'http://localhost:8080/api/getReviews';
    function toggleReview() {
        setAuthState(prevState => {
            return {
                ...prevState,
                showReview: !(authState.showReview),
                businessID: currBusinessID
            }
        });
    }

    function updateReviews(e) {
        if(e) {
            setPage(e.target.title);
            var pageNum = e.target.title;
        }
            
        else {
            setPage(1); 
            var pageNum = 1;
        }  
            
       
        axios.get(REST_API_GET_REVIEWS+"?businessID="+currBusinessID+"&page="+pageNum)
          .then(function (response) {
              console.log(response);
            if(response.data == 'NO RESULTS' && !authState.loggedIn && pageNum==1 ) {
                setReviews(<div style={{textAlign: 'left', marginTop: '1em', marginBottom: '1em' }} >None yet! Be the first to leave a review by logging in.</div>);
            }
            else if(response.data == 'NO RESULTS' && authState.loggedIn && pageNum == 1) {
                setReviews(<div style={{textAlign: 'left', marginTop: '1em', marginBottom: '1em' }} >None yet! Be the first to leave a review.</div>);
            }
            else if(response.data == 'NO RESULTS') {
                setReviews(<div style={{textAlign: 'left', marginTop: '1em', marginBottom: '1em'}} >This page is empty, help this business by adding more reviews!</div>);
            }
            else {
                let reviewsToDOM = response.data.map(review => { 
                    let username = review.username.split('@')[0]
                    return (
                        <div>
                            <ReviewSnippet username={username} rating={review.rating} reviewCount={review.numReviews} reviewMessage={review.message} />
                            <hr className='reviewLine' /><br />
                        </div>
                    );
                })
                setReviews(reviewsToDOM);
            }
          }).catch(function() {
            console.log('error');
        })
        //Update reviews now
    }

    useEffect(()=> {
        updateReviews(null, 1)
    }, [])

    return (
        <div className='bottomBackground' style={{ padding: '0 2vh 2vh 2vh', marginTop: '0', overflowX: 'hidden' }}>
            <div style={{ marginLeft: '1em' }}>
                {(authState.loggedIn === true) ?
                    <div style={{ textAlign: 'left' }}>
                        <input className='button' type='button' value='Review' onClick={toggleReview}></input>
                        <input className='button' type='button' value='Favorite'></input>
                    </div>
                    : null}
                {authState.loggedIn ? <hr className='line' style={{ width: '80em', marginTop: '1.5em' }} /> : null }
                <br/>
                {authState.loggedIn? <br/> : null}
                <div className="businessData" style={{ justifyContent: 'space-between' }}>
                    <div className="businessInfoSection">
                        <div style={{ textAlign: 'left' }}>

                            <p className='subText' style={{ marginTop: '0.2em' }}>Business Description</p>
                            <p style={{ width: '95%' }}>{parseText(description)}</p>
                            <br />
                            <p className='subText'>Other Information</p>
                            <p>{parseText(otherInfo)}</p>
                        </div>
                    </div>

                    <div className="contactSection">

                        <div style={{ margin: '1em 1em 0 0', padding: '0 1em 0 1em', border: 'solid', borderRadius: '10px', borderWidth: '1px' }}>
                            <p className='subText'>Contact</p>
                            <hr className='contactLine' />
                            <div className='contactBlue' style={{ textAlign: 'left' }}>

                                <p>{phone}</p>
                                <hr className='contactLine' />
                                <p>{website}</p>
                                <hr className='contactLine' />
                                <p>{email}</p>
                                <hr className='contactLine' />
                                <p style={{ color: 'black' }}>{address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <hr className='line' style={{ width: '95%' }} /><br />
                    <p className='subText' style={{ textAlign: 'left', marginTop: '20px' }}>Reviews</p>
                    {reviews}
                </div>
                <div className="pageSection">
                    <a href="#" title="1" style={{fontWeight: currPage == 1 ? 'bold' : null}} onClick={updateReviews}>1</a>
                    <a href="#" title="2" style={{fontWeight: currPage == 2 ? 'bold' : null}} onClick={updateReviews}>2</a>
                    <a href="#" title="3" style={{fontWeight: currPage == 3 ? 'bold' : null}} onClick={updateReviews}>3</a>
                    <a href="#" title="4" style={{fontWeight: currPage == 4 ? 'bold' : null}} onClick={updateReviews}>4</a>
                </div>
            </div>
        </div>


    )

}


export default BusinessPageBottom;