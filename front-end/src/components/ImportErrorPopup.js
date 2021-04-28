import '../css/BusinessPage.css';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside'
import { authContext } from './contexts/authContext';
//import { validateLoginForm } from './validate';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function ImportErrorPopup(props) {

    const useStyles = makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
    });
    const classes = useStyles();
    const { authState, setAuthState } = useContext(authContext);
    //const REST_API_CALL = 'http://localhost:8080/api/login'

    ImportErrorPopup.handleClickOutside = (e) => {
        setAuthState(prevState => { return { ...prevState, showReview: false } });
    };

    async function submitReview() {
        axios.post(REST_API_SUBMIT_REVIEW + "?businessID=" + authState.businessID + "&userID=" + authState.user.userId + "&rating=" + value + "&message=" + review).then(resp => {
            console.log(resp);
        }).then(resp => {
            console.log(resp);
            setAuthState(prevState => {
                return {
                    ...prevState,
                    uploadReady: true
                }
            })
        }).catch(function () {
            console.log('error');
        })
    }

    function submit() {
        
        ImportErrorPopup.handleClickOutside()
    }

    return (
        <div className='review-popup'>
            <form>
                <p>Please make sure you filled in the proper values</p>
                <Button style={{ width: '20%', marginTop: '3em' }} className='review-btn' size="small" variant="contained" onClick={submit} >Okay</Button>
            </form>
        </div>
    );
}

export default onClickOutside(ImportErrorPopup, clickOutsideConfig);