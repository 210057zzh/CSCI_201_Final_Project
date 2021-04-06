import React from 'react';
import  GoogleLogoutReact from 'react-google-login';

const clientId =
    "467227431315-qfa0plniiro21687j2ifupq82cd7j6op.apps.googleusercontent.com";
function GoogleLogout() {
    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully ✌');
    };

    return (
        <div>
            <GoogleLogoutReact
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogoutReact>
        </div>
    );
}

export default GoogleLogout;