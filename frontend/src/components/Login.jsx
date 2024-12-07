import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import {googleAuth} from '../api'
const Login = () => {

  const response = async (authResult) => {
    try{
      if(authResult['code']){
        const googleResponse = await googleAuth(authResult['code']);
        const {email,name,image} = googleResponse.data.user;
        console.log(googleResponse.data.user);
      }
      console.log(authResult);
    }
    catch(err){
      console.log('error while reaquesting google-oauth',err); 
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: response,
    onError: response,
    flow: 'auth-code',
    scope: 'openid email profile',
    redirect_uri: 'http://localhost:5000/api/auth/google/callback', // Correct URI here
  });
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
};

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
      >
        Login with Google
      </button>
    </div>
  )
}

export default Login
