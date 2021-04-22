import '../css/BusinessPage.css';

import ReviewSnippet from './ReviewSnippet';

function getReviews() {
    return (
        [
            {
                username: "Mary Jane",
                rating: 4,
                reviewCount: 4,
                reviewMessage: "Absolutely stellar service!  I would recommend Bob to anyone who needs to fix their plumbing issues.  Only drawback is the price... but a fine job is guaranteed!"
            },
            {
                username: "Mary Jane",
                rating: 4,
                reviewCount: 4,
                reviewMessage: "Absolutely stellar service!  I would recommend Bob to anyone who needs to fix their plumbing issues.  Only drawback is the price... but a fine job is guaranteed!"
            }
        ]
    )
}

function parseText(text) {
    let myString = text.split('\\n').map(function (item, idx) {
        return <span key={idx}>
            {item}
            <br />
        </span>
    })
    return myString;

}

function BusinessPageBottom({ description, otherInfo, phone, website, email, address }) {

    return (
        <div className='bottomBackground' style={{ padding: '0 2vh 2vh 2vh', marginTop: '0', overflowX: 'hidden' }}>
            <div style={{ marginLeft: '1em' }}>
                <div style={{ textAlign: 'left' }}>
                    <input className='button' type='button' value='Review'></input>
                    <input className='button' type='button' value='Favorite'></input>
                </div>
                <hr className='line' style={{ width: '80em', marginTop: '1.5em' }} /><br /><br />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ float: 'left', width: '75%' }}>
                        <div style={{ textAlign: 'left' }}>

                            <p className='subText' style={{ marginTop: '0.2em' }}>Business Description</p>
                            <p style={{ width: '95%' }}>{parseText(description)}</p>
                            <br />
                            <p className='subText'>Other Information</p>
                            <p>{parseText(otherInfo)}</p>
                        </div>
                    </div>

                    <div style={{ float: 'right', display: 'justify-content', verticalAlign: 'top', marginLeft: '10px' }}>

                        <div style={{ margin: '1em 1em 0 0', padding: '0 1em 0 1em', border: 'solid', borderRadius: '10px', borderWidth: '1px' }}>
                            <p className='subText'>Contact</p>
                            <hr className='contactLine' />
                            <div className='contactBlue' style={{ textAlign: 'left' }}>

                                <p>{phone}</p>
                                <hr className='contactLine' />
                                <p>{website}</p>
                                <hr className='contactLine' />
                                <p>{email}</p>
                                <hr className='contactLine' />
                                <p style={{ color: 'black' }}>{address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>

                    <hr className='line' style={{ width: '95%' }} /><br />
                    <p className='subText' style={{ textAlign: 'left', marginTop: '20px' }}>Reviews</p>
                    {
                        getReviews().map(review =>
                            <div>
                                <ReviewSnippet username={review.username} rating={review.rating} reviewCount={review.reviewCount} reviewMessage={review.reviewMessage} />
                                <hr className='reviewLine' /><br />
                            </div>
                        )

                    }
                </div>

                <div className="pageSection">
                    <a href="#" className="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                </div>
            </div>
        </div>


    )

}


export default BusinessPageBottom;