import '../css/BusinessPage.css';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside'
import { authContext } from './contexts/authContext';
import Error from './UserAuth/Error';
//import { validateLoginForm } from './validate';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const clickOutsideConfig = {
    handleClickOutside: () => Review.handleClickOutside
};
function Review(props) {
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const useStyles = makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
    });
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [review, setreview] = useState("");
    function updateReview(e) {
        setreview(e.target.value);
    }
    const classes = useStyles();
    const { authState, setAuthState } = useContext(authContext);
    const [err, setErr] = useState();
    //const REST_API_CALL = 'http://localhost:8080/api/login'
    const REST_API_SUBMIT_REVIEW = 'http://localhost:8080/api/addReview'

    Review.handleClickOutside = (e) => {
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
        if (review.length == 0) {
            setErr("Please enter the review")
        }
        submitReview();
        Review.handleClickOutside()
    }




    return (
        <div className='review-popup'>

            <form className='login-form' onSubmit={submit}>
                <div style={{ fontWeight: 'bold', fontSize: '20px', margin: '1em' }}>Rate Your Experience!</div>
                <Rating
                    size="large"
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                <br></br>
                <div style={{ width: "80%", transform: "translate(13%,0)" }}>
                    <TextField multiline
                        variant="outlined"
                        fullWidth={true}
                        rows={10}
                        rowsMax={10}
                        placeholder='tell us your experience...'
                        onChange={updateReview}
                        margin='dense'
                        name="review"
                        label="write your review here"
                        error={err}
                        helperText={err ? err : ''}
                    />
                </div>
                <Button style={{ width: '20%', marginTop: '3em' }} className='review-btn' size="small" variant="contained" onClick={submit} >Post it!</Button>
            </form>
        </div>
    );
}

export default onClickOutside(Review, clickOutsideConfig);