import FullStar from '../css/RatingStars/100.svg';
import HalfStar from '../css/RatingStars/50.svg';
import EmptyStar from '../css/RatingStars/0.svg';

function getStars(value) {
    const stars = [];
    const [whole, part] = parseFloat(value).toString().split(".");
    for(let i=0; i < whole; i++) stars.push(100);
    if(part) stars.push(50);
    for(let i=whole; i < (part ? 4 : 5); i++) stars.push(0);

    return stars;
}

function parseStar(value) {
    switch (value) {
        case 100:
            return FullStar;
        case 50:
            return HalfStar;
        case 0:
            return EmptyStar;
    }
}

function StarRating({ value }) {
    return (
        <div style={{display: 'flex', flexWrap: 'nowrap'}}>
            {getStars(value).map((value) => (
                <div style={{width: '40px', marginRight: '5px', float: 'left', content: `URL(${parseStar(value)})`}}/>
            ))}
        </div>
    )
}

StarRating.defaultProps = {
    value: 0
  };

export default StarRating;