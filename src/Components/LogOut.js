import React from 'react';
import styles from './Header.module.css';
import { auth } from '../firebase';

const LogOut = () => {
  const handleClick = () => {
    auth.signOut();
    window.location.href = '/sports-chat/';
  };

  return (
    <button className={styles.navButton} onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogOut;
