import React from 'react'
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
function Google() {
    return (
        <div>
            <GoogleOAuthProvider clientId="370355015242-i74ue5fs2dmhutl5bca639b1cldsa20j.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log(decoded.email);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />;
            </GoogleOAuthProvider>;
        </div>
    )
}

export default Google
