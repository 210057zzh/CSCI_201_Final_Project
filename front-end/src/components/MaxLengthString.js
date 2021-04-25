
function MaxLengthString({text, maxLength}) {
    return(
        <div style={{textAlign:'left', fontWeight:'500', marginTop: '1em'}}>
            {text.length > maxLength ? text.substring(0, maxLength-3) + '...' : text}
        </div>
    )
}

export default MaxLengthString;