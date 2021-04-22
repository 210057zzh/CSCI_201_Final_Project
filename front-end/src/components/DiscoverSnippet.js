import '../css/DiscoverSnippet.css';
import StarRating from './StarRating.js';
import { NavLink, withRouter } from 'react-router-dom'

function DiscoverSnippet(props) {

    return (
        <NavLink className='discoverLink' to={'../businesspage/' + props.businessID}>
            
            <div className='discoverSnippet'>
                {/*<img src={picture} width='150px' className='picture' />*/}
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{float: 'left', marginLeft: '0.5em'}}>
                        <p className='title'>{props.businessName}</p>
                        <div style={{ display: 'flex' }}>
                            <StarRating value={props.rating} style={{ float: 'left' }} />
                            {props.reviewCount > 0 && <p style={{ float: 'right', margin: '8px 8px' }} className='other'>{props.reviewCount} Reviews</p>}
                        </div>
                    </div><br/>
                    <p className='other' >{props.phoneNumber}<br />{props.address}</p>
                </div>
                <p className='description' >{props.description}</p>
            </div>
        </NavLink>
    )

}


export default withRouter(DiscoverSnippet);