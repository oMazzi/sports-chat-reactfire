import React from 'react';
import { useAuth } from 'reactfire';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

import GoogleButton from 'react-google-button';

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
