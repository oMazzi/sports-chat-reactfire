import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import React from 'react';
import GoogleButton from 'react-google-button';
import { useAuth } from 'reactfire';

const SignIn = () => {
  const auth = useAuth();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      <GoogleButton onClick={googleSignIn} />
    </div>
  );
};

export default SignIn;
