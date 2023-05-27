import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import LogOut from './LogOut';

const Header = () => {
  const [user] = useAuthState(auth);

  const handleClick = () => {
    window.location.href = '/signup';
  };

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div>
          <Link className={styles.logo} to="/" aria-label="Sports Chat Home">
            Sports Chat
          </Link>
        </div>
        <div className={styles.navLinks}>
          {user ? (
            <Link to={'/myaccount'} className={styles.navLinkText}>
              {user.displayName}
            </Link>
          ) : (
            <Link to={'/login'} className={styles.navLinkText}>
              Sign in
            </Link>
          )}
          {user ? (
            <LogOut />
          ) : (
            <button className={styles.navButton} onClick={handleClick}>
              SIGN UP
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
