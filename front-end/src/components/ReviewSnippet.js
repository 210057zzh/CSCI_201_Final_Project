import '../css/BusinessPage.css';
import '../css/ReviewSnippet.css';
import StarRating from './StarRating.js';



function ReviewSnippet({ username, reviewCount, rating, reviewMessage }) {

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <p className='username'>{username}</p>
                { (reviewCount == 1 && <p className='reviewCount'>1 review</p>) || (rating > 1 && <p className='reviewCount'>{reviewCount} reviews</p>)}

            </div>
            {rating > 0 && <StarRating widthValue='25px' value={rating} />}
            <p className='reviewText'>{reviewMessage}</p>
        </div>


    )

}


export default ReviewSnippet;