import React from 'react';
import { useAuth } from 'reactfire';
import { useSignOut } from 'react-firebase-hooks/auth';

import styles from './Header.module.css';

const LogOut = () => {
  const auth = useAuth();
  const [signOut] = useSignOut(auth);

  const handleClick = () => {
    signOut();
    window.location.href = '/sports-chat-reactfire/';
  };

  return (
    <button className={styles.navButton} onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogOut;
