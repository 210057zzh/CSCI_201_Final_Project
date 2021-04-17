function Error(props) {
    return(
        <div className='error'>
            <div>Error logging in: {props.errorMsg}</div>
        </div>
    );
}

export default Error;