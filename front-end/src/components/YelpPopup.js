import {useState, useContext} from 'react';
import '../css/BusinessPage.css';
import onClickOutside from 'react-onclickoutside'
import { authContext } from './contexts/authContext';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

const clickOutsideConfig = {
    handleClickOutside: () => YelpPopup.handleClickOutside
}

function YelpPopup (props) {
    const {authState, setAuthState} = useContext(authContext)
    const [name, setName] = useState();
    const [address, setAddress] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [addressErr, setAddressErr] = useState()
    const REST_API_CALL_YELP = 'http://localhost:8080/api/yelpfill'

    function changeName(e) {
        setName(e.target.value)
    }

    function changeAddress(e) {
        setAddress(e.target.value)
    }
    
    YelpPopup.handleClickOutside = (e) => {
        setAuthState(prevState => { return { ...prevState, showYelp: false } });
    };

    function submit() {
        if(name == '' && address == '') {
            setNameErr('Fill out required field');
            setAddressErr('Fill out required field');
        }
        else if(name == '') {
            setNameErr('Fill out required field');
            setAddressErr('');
        }
        else if(address == '') {
            setAddressErr('Fill out required field');
            setNameErr('');
        }
        else {
            axios.get(REST_API_CALL_YELP, {
                params: {
                    name: name,
                    address: address
                }
            }).then(res => {
                console.log(res);
                if(res.data.error) {
                    setNameErr('Could not find that business. Ensure that the name was inputted correctly');
                    setAddressErr('Check that the address is formatted correctly (comma-separated). Example: 3089 Edinger Ave, Tustin, CA');
                }
                else {
                    var phoneNumber = res.data.display_phone;
                    var JSONwebsite = res.data.url.split('?')[0];
                    
                    var todaysdate = new Date();
                    var dayNumber = todaysdate.getDay();
                    var JSONstartingTime = res.data.hours[0].open[dayNumber].start.substring(0, 2) + ":" + res.data.hours[0].open[dayNumber].start.substring(2, 5);
                    var JSONendingTime = res.data.hours[0].open[dayNumber].end.substring(0, 2) + ":" + res.data.hours[0].open[dayNumber].end.substring(2, 5);
                    var category = res.data.categories[0].title;
                    var transactions = res.data.transactions.join(', ');

                    setAuthState(prevState => {
                        return {
                            ...prevState,
                            BusinessEdit: {
                                ...prevState.BusinessEdit,
                                phone: phoneNumber,
                                startingTime: JSONstartingTime,
                                endingTime: JSONendingTime,
                                website: JSONwebsite,
                                category: category,
                                otherInfo: transactions,
                                name: name,
                                address: address
                            }
                        }
                    });
                    setNameErr(null);
                    setAddressErr(null);
                    YelpPopup.handleClickOutside();
                }
            }).catch(function (error) {
                setNameErr('Could not find that business. Ensure that the name was inputted correctly');
                setAddressErr('Check that the address is formatted correctly (comma-separated). Example: 3089 Edinger Ave, Tustin, CA');
            })
        }
    }
    return(<div className='yelp-window'>
        <div style={{width:'70%', margin:'1em auto 0.5em auto',float:'left'}}class='yelp-window-title'>Import from Yelp</div>
        <div><TextField multiline
            style={{width: '70%', marginBottom:'0.5em'}}
            variant="outlined"
            rows={1}
            rowsMax={1}
            placeholder='Name'
            onChange={changeName}
            margin='dense'
            name="business-name"
            label="Business name"
            error={nameErr}
            helperText={nameErr}
        /></div>
        <div><TextField multiline
            style={{width: '70%'}}
            variant="outlined"
            rows={1}
            rowsMax={1}
            placeholder='Street, City, State'
            onChange={changeAddress}
            margin='dense'
            name="business-name"
            label="Address"
            error={addressErr}
            helperText={addressErr}
        /></div>
        <div>
            <button className='button' onClick={YelpPopup.handleClickOutside}>Cancel</button>
            <button className='button' onClick={submit}>Import</button>
        </div>
    </div>)
}

export default onClickOutside(YelpPopup, clickOutsideConfig);