import '../css/DiscoverSnippet.css';
import StarRating from './StarRating.js';

function DiscoverSnippet(props) {

    return (
        <div className='discoverSnippet'>
            {/*<img src={picture} width='150px' className='picture' />*/}
            <div class='leftContent'>
                <div>
                    <p className='title'>{props.businessName}</p>
                    <div style={{display: 'flex'}}>
                        <StarRating value={props.rating} style={{float: 'left'}}/>
                        {props.reviewCount > 0 && <p style={{ float: 'right', margin: '8px 8px'}} className='other'>{props.reviewCount} Reviews</p>}
                    </div>
                </div>
                <p style={{ margin: '1vh 1em 0px', textAlign: 'right' }} className='other' >{props.phoneNumber}<br />{props.address}</p>
            </div>
            <p className='description leftContent' >{props.description}</p>
        </div>
    )

}


export default DiscoverSnippet;