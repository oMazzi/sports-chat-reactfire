import React from 'react';
import styles from './Header.module.css';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useAuth } from 'reactfire';

const LogOut = () => {
  const auth = useAuth();
  const [signOut] = useSignOut(auth);

  const handleClick = () => {
    signOut();
    window.location.href = '/sports-chat/';
  };

  return (
    <button className={styles.navButton} onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogOut;
