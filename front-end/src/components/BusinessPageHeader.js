import '../css/BusinessPage.css';

import StarRating from './StarRating.js';

function getStringCost(cost) {
    var costString = "";
    for(var i = 0; i < cost; i++) {
        costString += '$';
    }
    return costString;
}


function BusinessPageHeader({name, hours, category, rating, reviewCount, priceLevel}) {

    return (
        <div className='background' style={{padding: '2vh 2vh 2vh 2vh', marginBottom: 0}}>
            <div className='leftContent'>
                <div style={{ textAlign: 'left'}}>
                    <p className='businessName'>{name}</p>
                    <p style={{ float: 'left', whiteSpace: 'nowrap' }} className='subText' >Open {hours}<span style={{ marginLeft: '25px' }}>{category}</span></p>
                </div>
            </div>
            <div className="rightContent" style={{ textAlign: 'right'}}>
                <div style={{display: 'flex'}}>
                {<StarRating value={rating} />}
                {reviewCount > 0 && <p style={{ margin: '8px 8px' }} className='other'>{reviewCount} Reviews</p>}
                </div>
                <p className='cost'>{getStringCost(priceLevel)}</p>
            </div>
        </div>


    )

}


export default BusinessPageHeader;