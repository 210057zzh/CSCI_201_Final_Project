import '../css/DiscoverSnippet.css';
import StarRating from './StarRating.js';
import { NavLink, withRouter } from 'react-router-dom'

function DiscoverSnippet(props) {

    return (
        <NavLink className='discoverLink' to={'../businesspage/' + props.businessID}>
            
            <div className='discoverSnippet'>
                {/*<img src={picture} width='150px' className='picture' />*/}
                <div id="container">
                    <div className="leftSide">
                        <p className='title'>{props.businessName}</p>
                        <div className="leftData">
                            <StarRating value={props.rating} style={{ float: 'left' }} />
                            {props.reviewCount > 0 && <p className='MoreInfo other'>{props.reviewCount} {props.reviewCount == 1 ? 'Review' : 'Reviews'}</p>}
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