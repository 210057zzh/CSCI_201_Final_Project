import '../css/BusinessPage.css';
import { useState, useContext, useEffect } from 'react';
import StarRating from './StarRating.js';
import Pencil from '../css/img/pencil.png';
import { authContext } from './contexts/authContext';
import TextField from '@material-ui/core/TextField';
import Error from './UserAuth/Error';
import { useMediaQuery } from 'react-responsive';

function BusinessPageHeaderEdit({ name, startingTime, endingTime, givenCategory, rating, reviewCount, priceLevel }) {
    const { authState, setAuthState } = useContext(authContext);
    const [editPrice, setPriceLevel] = useState('');
    const isVerySmall = useMediaQuery({ minWidth: 900 });
    function updateName(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    name: e.target.value
                }
            }
        });
    }

    function updateStartTime(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    startingTime: e.target.value
                }
            }
        });
    }

    function updateEndTime(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    endingTime: e.target.value
                }
            }
        });
    }

    function updateCategory(e) {
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    category: e.target.value
                }
            }
        });
    }

    function handlePriceUpdate(e) {
        setPriceLevel(e.target.id);
        let y = e.target.id;
        setAuthState(prevState => {
            return {
                ...prevState,
                BusinessEdit: {
                    ...prevState.BusinessEdit,
                    priceLevel: y
                }
            }
        });
        for (let x = 1; x <= e.target.id; x++) {
            document.getElementById(x).style.color = 'black';
        }
    }

    function resetColor(e) {
        let x = e.target.id;
        document.getElementById(x).style.color = 'black';
        x++;

        for (; x <= 5; x++) {
            document.getElementById(x).style.color = 'rgb(122, 122, 122)';
        }
    }

    function color() {
        for (let x = 1; x <= editPrice; x++) {
            document.getElementById(x).style.color = 'black';
        }
        for (let y = editPrice + 1; y <= 5; y++) {
            document.getElementById(y).style.color = 'rgb(122, 122, 122)';
        }
    }

    function initialPriceLevel() {
        setPriceLevel(priceLevel)
        for (let x = 1; x <= priceLevel; x++) {
            document.getElementById(x).style.color = 'black';
        }
    }

    var cleft = -12;
    var ctop = -25;
    var ctrans = 'translate(' + cleft + '%, ' + ctop + '%)';
    var css = {
        transform: ctrans,
        marginTop: 0,
        width: '70%',
    }


    return (
        <div className='background' style={{ padding: '2vh 2vh 2vh 2vh', marginBottom: 0 }} onLoad={initialPriceLevel}>
            <div className='leftContent'>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'inline' }}>
                        <div className='fieldBackground'>
                            <input className='businessInput' type='text' defaultValue={name} onChange={updateName}></input>
                        </div>
                        {isVerySmall && <span><img src={Pencil} className="pencil"></img><br /></span>}
                        <div style={css}>
                            {authState.BusinessEditErrs.name ? <Error errorMsg={authState.BusinessEditErrs.name}></Error> : null}
                        </div>
                    </div>
                    <div style={{ display: 'inline' }}>
                        <div className='fieldBackground'>
                            <p className='fieldEditTextHeader'>Open</p>
                            <input type='time'
                                variant="outlined"
                                id="startingTime"
                                defaultValue={startingTime}
                                value={startingTime}
                                className='timeInput'
                                onChange={updateStartTime} />
                            <p className='fieldEditTextHeader' >to</p>
                            <input type='time' defaultValue={endingTime} value={endingTime} id="endingTime" className='timeInput' onChange={updateEndTime}></input>
                        </div>
                        {isVerySmall && <img src={Pencil} className="pencil"></img>}
                        <div style={css}>
                            {authState.BusinessEditErrs.time ? <Error errorMsg={authState.BusinessEditErrs.time} ></Error> : null}
                        </div>
                    </div>

                    <div style={{ display: 'inline' }}>
                        <div className='fieldBackground'>
                            <p className='fieldEditTextHeader'>Category</p>
                            <input list='categories' id='category' className='categorySelect' defaultValue={givenCategory} onChange={updateCategory}></input>
                            <datalist id='categories'>
                                <option value="Art" />
                                <option value="Auto" />
                                <option value="Entertainment" />
                                <option value="Education" />
                                <option value="Finance" />
                                <option value="Hardware Supplies" />
                                <option value="Independent" />
                                <option value="Personal Care" />
                                <option value="Pool Supplies" />
                                <option value="Recreation" />
                                <option value="Restaurant" />
                                <option value="Other" />
                            </datalist>
                        </div>
                        {isVerySmall && <img src={Pencil} className="pencil"></img> }
                        <div style={css}>
                            {authState.BusinessEditErrs.category ? <Error errorMsg={authState.BusinessEditErrs.category}></Error> : null}
                        </div>
                    </div>

                </div>
            </div>
            <div className="rightContentEditing">
                <div className="starEditRating">
                    {<StarRating value={rating} />}
                    {reviewCount > 0 && <p style={{ margin: '8px 8px' }} className='other'>{reviewCount} Reviews</p>}
                </div><br />
                <div className='fieldBackground' style={{ display: 'inline-block', float: 'left', paddingRight: '1em' }}>

                    <p className='editCost' onMouseOut={color}>
                        <span onClick={handlePriceUpdate} onMouseOver={resetColor} id='5'>$</span>
                        <span onClick={handlePriceUpdate} onMouseOver={resetColor} id='4'>$</span>
                        <span onClick={handlePriceUpdate} onMouseOver={resetColor} id='3'>$</span>
                        <span onClick={handlePriceUpdate} onMouseOver={resetColor} id='2'>$</span>
                        <span onClick={handlePriceUpdate} onMouseOver={resetColor} id='1'>$</span>
                    </p>
                </div>
                {isVerySmall && <img src={Pencil} className="pencil" style={{ float: 'left', marginTop: '20px' }}></img>}
            </div>
        </div >


    )

}


export default BusinessPageHeaderEdit;