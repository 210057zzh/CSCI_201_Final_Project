import '../css/BusinessPage.css';

import StarRating from './StarRating.js';

function getStringCost(cost) {
    var costString = "";
    for (var i = 0; i < cost; i++) {
        costString += '$';
    }
    return costString;
}



function BusinessPageHeader({ name, startingTime, endingTime, category, rating, reviewCount, priceLevel }) {

    function formatTime(time) {
        //Stackoverflow https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no/13899011#13899011
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    return (
        <div className='background' style={{ padding: '2vh 2vh 2vh 2vh', marginBottom: 0 }}>
            <div className='leftContent'>
                <div style={{ textAlign: 'left' }}>
                    <p className='businessName'>{name}</p>
                    <p style={{ float: 'left', whiteSpace: 'nowrap' }} className='subText' >Open {formatTime(startingTime)} to {formatTime(endingTime)}<span style={{ marginLeft: '25px' }}>{category}</span></p>
                </div>
            </div>
            <div className="rightContent" style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex' }}>
                    {<StarRating value={rating} />}
                    {reviewCount > 0 && <p style={{ margin: '8px 8px' }} className='other'>{reviewCount} Reviews</p>}
                </div>
                <p className='cost'>{getStringCost(priceLevel)}</p>
            </div>
        </div>


    )

}


export default BusinessPageHeader;