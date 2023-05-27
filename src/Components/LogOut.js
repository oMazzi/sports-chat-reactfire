import React from 'react';
import styles from './Header.module.css';
import { auth } from '../firebase';

const LogOut = () => {
  return (
    <button className={styles.navButton} onClick={() => auth.signOut()}>
      Logout
    </button>
  );
};

export default LogOut;
